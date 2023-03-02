# LX-VSM-NPM

## How to use this package

1. Clone this repository to your computer
2. Run `npm i -g` to install this utility to your local npm installation globally
3. Add a script to your `package.json` like this:
`"lx-vsm": "npx lx-vsm-npm --region us --host demo-us --api-token $VSM_TOKEN"`
Note: This package also supports uploading CycloneDX SBOM files and can easily be paired with [@cyclonedx/cyclonedx-npm](https://github.com/CycloneDX/cyclonedx-node-npm) with the following command:
`"lx-vsm": "cyclonedx-npm --output-file=sbom.json && npx lx-vsm-npm --region us --host demo-us --api-token $VSM_TOKEN"`
4. Update the region, host, and api-token for your instance of VSM
5. Run `npm run lx-vsm` to update your service in VSM
