# LX-VSM-NPM

## What is it? 

This is an `npx` runnable package to submit project information, including a [CycloneDX](https://cyclonedx.org/) compliant SBOM, to your [LeanIX VSM](https://www.leanix.net/en/products/value-stream-management) workspace via the [Service Discovery API](https://docs-vsm.leanix.net/reference/discovery_service).

## When should I use it?

Primarily used for submitting an SBOM during your CI/CD pipeline, but can be used to submit additional data during various stages of development and deployment, such as version numbers, testing results, code quality, and deployment times.

## How does it work?

`npx` is used to run this package, and arguments can be seen by running `npx lx-vsm-npm --help`. This script pulls some metadata from the `package.json` file and uses the arguments to authenticate with your workspace to submit this data and (optional) SBOM to the [Service Discovery API](https://docs-vsm.leanix.net/reference/discovery_service). See the next section for detailed instructions.

## How do I use it?

1. Clone this repository to your computer
2. Run `npm i -g` to install this utility to your local npm installation globally
3. Add a script to your `package.json` like this:
`"lx-vsm": "npx lx-vsm-npm --region us --host demo-us --api-token $VSM_TOKEN"`
Note: This package also supports uploading CycloneDX SBOM files and can easily be paired with [@cyclonedx/cyclonedx-npm](https://github.com/CycloneDX/cyclonedx-node-npm) with the following command:
`"lx-vsm": "cyclonedx-npm --output-file=sbom.json && npx lx-vsm-npm --region us --host demo-us --api-token $VSM_TOKEN"`
4. Update the region, host, and api-token for your instance of VSM
5. Run `npm run lx-vsm` to update your service in VSM

## License

This project is licensed under the MIT License

## Contact

Start with the [VSM Documentation](https://docs-vsm.leanix.net/docs), or feel free to contact [LeanIX Support](https://leanix.zendesk.com/hc/en-us/community/topics) for anything else.
