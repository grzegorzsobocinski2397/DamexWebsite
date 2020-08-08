cd C:\xampp\htdocs\wp-content\
Remove-Item -Recurse -Force .\output
mkdir output
Start-Process powershell.exe .\build-block -wait
echo d | xcopy C:\xampp\htdocs\wp-content\plugins\damex-block\dist  C:\xampp\htdocs\wp-content\output\plugins\damex-block\dist /E /C /H /R /K /O /Y
Start-Process powershell.exe .\build-theme -wait
New-Item -Path . -Name "exluded.txt" -ItemType "file" -Value "C:\xampp\htdocs\wp-content\themes\damex\assets\src\node_modules\*"
echo d | xcopy C:\xampp\htdocs\wp-content\themes\damex  C:\xampp\htdocs\wp-content\output\themes\damex\damex /e /C /H /R /K /O /Y /EXCLUDE:exluded.txt
cd C:\Users\grzeg\Desktop