export default `
precision mediump float;
uniform sampler2D map;
uniform float hueShift;

struct Blob {
  float radius;
  vec2 position;
  float glowOffset;
  float glowClippingPosition;
};
uniform Blob blobs[ BLOBS_COUNT ];

uniform vec2 resolution;
uniform vec2 position;

varying vec2 vUv;

vec3 rgb2hsv(vec3 color) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(color.bg, K.wz), vec4(color.gb, K.xy), step(color.b, color.g));
    vec4 q = mix(vec4(p.xyw, color.r), vec4(color.r, p.yzx), step(p.x, color.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 color) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(color.xxx + K.xyz) * 6.0 - K.www);
    return color.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), color.y);
}

vec3 shiftHue(vec3 color) {
  vec3 hsv = rgb2hsv(color);
  hsv.x += hueShift;
  hsv.x = fract(hsv.x);
  return hsv2rgb(hsv);
}

void addBlob(inout vec4 texel, in Blob blob) {
  vec2 direction = blob.position - gl_FragCoord.xy;
	float distance = length(direction);

  if (distance < blob.radius) {
		float exp = 1.0;
		vec2 offset = (1.0 - pow(distance / blob.radius, exp)) * direction;

		texel = texture2D(map, vUv + offset / vec2(BLOB_RESOLUTION));
    if (distance >= blob.radius - float(BLOB_BORDER_WIDTH)) {
      texel = texel * vec4(BLOB_BORDER_COLOR);
    }
    if (distance <= blob.radius - blob.glowOffset && distance >= blob.radius - (blob.glowOffset + float(BLOB_BORDER_WIDTH)) && gl_FragCoord.x < blob.position.x - blob.glowClippingPosition && gl_FragCoord.y > blob.position.y + blob.glowClippingPosition) {
      texel = texel * vec4(BLOB_BORDER_COLOR);
    }
	}

}

void main() {

	vec4 texel = texture2D( map, vUv );

  if (blobs[0].radius > 0.0) {
    addBlob(texel, blobs[0]);
  }
  if (blobs[1].radius > 0.0) {
   addBlob(texel, blobs[1]);
  }
  if (blobs[2].radius > 0.0) {
    addBlob(texel, blobs[2]);
  }
  gl_FragColor = texel;
  gl_FragColor.rgb = shiftHue(texel.rgb);
}
`;
