#! /usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import { VSMDiscovery } from '../libs/vsm-discovery.js';

async function main(options) {
  
  if (!fs.existsSync(options.packagePath)) {
    console.log(`Could not find the package file at '${options.packagePath}'`);
  }

  const packageFile = JSON.parse(fs.readFileSync(options.packagePath));

  const vsmDiscovery = new VSMDiscovery(options.host, options.region, options.apiToken);

  console.log('Sending service...');

  vsmDiscovery.serviceDiscovery({
    id: packageFile.name,
    sourceType: 'nodejs',
    sourceInstance: 'lx-vsm-npm',
    name: packageFile.name,
    description: packageFile.description,
    bomFileLocation: fs.existsSync(options.sbomPath) ? options.sbomPath : undefined,
    data: {
      version: packageFile.version,
      author: packageFile.author,
      license: packageFile.license
    }
  });

  console.log('lx-vsm-npm complete!');
}

console.log('Starting lx-vsm-npm...');

const program = new Command();

program
  .name('lx-vsm-npm')
  .description('CLI to upload a node package to LeanIX VSM')
  .version('1.0.0');

program
  .option('--package-path <string>', 'The path to the package.json file, including the file name.', './package.json')
  .option('-s, --sbom-path <string>', 'The path to the CycloneDX SBOM JSON/XML, including the file name.', './sbom.json')
  .requiredOption('-r, --region <string>', 'The hosting region of your VSM workspace. Reach out to LeanIX if you don\'t know. One of: eu|de|us|au|ca|ch')
  .requiredOption('-h, --host <string>', 'The DNS host of your VSM workspace. e.g. https://acme.leanix.net would be "acme".')
  .requiredOption('-a, --api-token <string>', 'The admin technical user API Token. Note this is NOT the OAuth token, but the user token.');

program.parse(process.argv);

main(program.opts());
