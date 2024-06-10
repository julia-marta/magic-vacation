import * as THREE from 'three';

export const StandardBasicBlue = {
  type: `standard`,
  reflection: `basic`,
  options: {
    color: `Blue`,
    side: THREE.DoubleSide,
  },
};

export const StandardBasicGreen = {
  type: `standard`,
  reflection: `basic`,
  options: {
    color: `Green`,
    side: THREE.DoubleSide,
  },
};

export const StandardBasicPurple = {
  type: `standard`,
  reflection: `basic`,
  options: {
    color: `Purple`,
    side: THREE.DoubleSide,
  },
};

export const StandardBasicShadowedPurple = {
  type: `standard`,
  reflection: `basic`,
  options: {
    color: `ShadowedPurple`,
    side: THREE.DoubleSide,
  },
};

export const StandardBasicWhite = {
  type: `standard`,
  reflection: `basic`,
  options: {
    color: `White`,
  },
};

export const StandardSoftBlue = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `Blue`,
  },
};

export const StandardSoftBrightBlue = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `BrightBlue`,
    side: THREE.DoubleSide,
  },
};

export const StandardSoftLightBlue = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `LightBlue`,
  },
};

export const StandardSoftSkyLightBlue = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `SkyLightBlue`,
    side: THREE.DoubleSide,
  },
};

export const StandardSoftMountainBlue = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `MountainBlue`,
    side: THREE.DoubleSide,
  },
};

export const StandardSoftOrange = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `Orange`,
  },
};

export const StandardSoftLightDominantRed = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `LightDominantRed`,
    side: THREE.DoubleSide,
  },
};

export const StandardSoftDominantRed = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `DominantRed`,
  },
};

export const StandardSoftShadowedDominantRed = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `ShadowedDominantRed`,
  },
};

export const StandardSofDarkPurple = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `DarkPurple`,
    side: THREE.DoubleSide,
  },
};

export const StandardSoftPurple = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `Purple`,
    side: THREE.DoubleSide,
  },
};

export const StandardSoftBrightPurple = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `BrightPurple`,
  },
};

export const StandardSoftShadowedDarkPurple = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `ShadowedDarkPurple`,
  },
};

export const StandardSoftShadowedBrightPurple = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `ShadowedBrightPurple`,
  },
};

export const StandardSoftLightPurple = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `LightPurple`,
  },
};

export const StandardSoftAdditionalPurple = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `AdditionalPurple`,
    side: THREE.DoubleSide,
  },
};

export const StandardSoftShadowedAdditionalPurple = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `ShadowedAdditionalPurple`,
    side: THREE.DoubleSide,
  },
};

export const StandardSoftGrey = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `Grey`,
  },
};

export const StandardSoftMetalGrey = {
  type: `standard`,
  reflection: `soft`,
  options: {
    color: `MetalGrey`,
  },
};

export const PhongStrongSnowColor = {
  type: `phong`,
  reflection: `strong`,
  options: {
    color: `SnowColor`,
  },
};

export const CustomSoftCarpetLightPurple = {
  type: `custom`,
  reflection: `soft`,
  options: {
    name: `standard`,
    shaders: `carpet`,
    colors: [
      {
        name: `mainColor`,
        value: `LightPurple`,
      },
      {
        name: `stripesColor`,
        value: `AdditionalPurple`,
      }
    ],
    additional: {
      stripesCount: new THREE.Uniform(7)
    }
  },
};

export const CustomSoftCarpetShadowedLightPurple = {
  type: `custom`,
  reflection: `soft`,
  options: {
    name: `standard`,
    shaders: `carpet`,
    colors: [
      {
        name: `mainColor`,
        value: `ShadowedLightPurple`,
      },
      {
        name: `stripesColor`,
        value: `ShadowedAdditionalPurple`,
      }
    ],
    additional: {
      stripesCount: new THREE.Uniform(7)
    }
  },
};

export const CustomSoftRoadGreyWhite = {
  type: `custom`,
  reflection: `soft`,
  options: {
    name: `standard`,
    shaders: `road`,
    colors: [
      {
        name: `mainColor`,
        value: `Grey`,
      },
      {
        name: `stripesColor`,
        value: `White`,
      }
    ],
    additional: {
      stripesCount: new THREE.Uniform(9),
      stripesSize: new THREE.Uniform(20),
    }
  },
};
