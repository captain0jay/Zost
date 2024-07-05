@echo off
setlocal enabledelayedexpansion

:: Get the current directory path
set "rootDir=%cd%"

:: List of directories to install dependencies in
set "directories=zost-cli ui"

:: Print current directory for debugging
echo Current directory: %rootDir%

:: Install dependencies for zost-cli
set "targetDir=%rootDir%\zost-cli"
echo Checking directory: !targetDir!
if exist "!targetDir!" (
    echo Directory zost-cli exists at !targetDir!
    echo Installing npm dependencies in zost-cli
    cd "!targetDir!"
    npm install
    cd /d "%rootDir%"
) else (
    echo Directory zost-cli does not exist at !targetDir!
)

:: Install dependencies for ui
set "targetDir=%rootDir%\ui"
echo Checking directory: !targetDir!
if exist "!targetDir!" (
    echo Directory ui exists at !targetDir!
    echo Installing npm dependencies in ui
    cd "!targetDir!"
    npm install
    cd /d "%rootDir%"
) else (
    echo Directory ui does not exist at !targetDir!
)

endlocal
echo All dependencies installed
pause
