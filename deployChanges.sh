npm run build
npm pack
cd ../openmrs-module-bahmniapps/ui
npm install ../../bahmni-clinical-components/bahmni-clinical-components-0.0.4.tgz
grunt 'copy:nodeModules'
cd ../../bahmni-clinical-components
