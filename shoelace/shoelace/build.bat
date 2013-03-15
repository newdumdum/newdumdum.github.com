if "%1" == "" goto end
set namespace=shoelace
rd %1\%namespace% /s/q

xcopy src\components\*.* %1\%namespace%\components /e/r/y/i
xcopy src\resources\common\images\*.* %1\%namespace%\resources\common\images /e/r/y/i
xcopy src\resources\themes\default\images\*.* %1\%namespace%\resources\themes\default\images /e/r/y/i
xcopy src\resources\themes\i18n\*.* %1\%namespace%\resources\themes\i18n /e/r/y/i
copy src\favicon.ico %1\%namespace%\favicon.ico
md %1\%namespace%\resources\themes\default\styles

cscript.exe ..\translate.js src\%namespace%-debug.html %1\%namespace%\%namespace%.html %1\%namespace%\%namespace%.js %1\%namespace%\resources\themes\default\styles\%namespace%.css

if "%2" == "nocompressor" goto end
set currDir=%cd%
pushd %1\%namespace%
for /r %%i in (*.js) do java -jar %currDir%\..\yuicompressor-2.4.6.jar --type js --charset utf-8 -o %%i %%i
for /r %%i in (*.css) do java -jar %currDir%\..\yuicompressor-2.4.6.jar --type css --charset utf-8 -o %%i %%i
popd
:end