cd C:\xampp\htdocs\wp-content\themes\damex\assets\src
npm install
npm run build
Remove-Item .\node_modules\* -Recurse -Force
return 0