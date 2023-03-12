#!/bin/sh

function Error_Handler() {
    command=$1
    log_file=$PWD/error.log
    stderr=$($command 2>&1 >/dev/null)
    if [ $? -ne 0 ]; then
        echo "Error: $(date +%F_%R) $command" >> $log_file
        echo "    $stderr" >> $log_file
        echo "$stderr"
    fi
}


function Build() {
  echo "Pulling from origin..."
  Error_Handler "git pull origin main"
  echo "Installing dependancies..."
  Error_Handler "npm install"
  echo "Building ..."
  Error_Handler "npm run build"
  
}


while getopts ":hb" opt; do
  case $opt in
    h)
      echo "This is the help section of the script test.sh"
      echo "Available options are:"
      echo "-h : display this help section"
      echo "-b : pull the main branch of the project, build the project and publish it on internet"
      echo "no options will only publish the project"
      exit 0
      ;;
    b)
      Build
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

cd /home/curcuma/node/artblog

git pull origin main
git commit --allow-empty -m "[deployed]"
git push origin main

session_status=$(tmux list-sessions | grep artblogDeamon)
if [[ $session_status =~ "artblogDeamon" ]]; then
  Error_Handler "tmux kill-session -t artblogDeamon"
fi

stderrTmux=$(tmux new-session -d -s artblogDeamon "npm run start" 2>&1 >/dev/null)
if [ $? -ne 0 ]; then
        echo "Error: $(date +%F_%R) tmux new-session -d -s artblogDeamon \"npm run start\" " >> $PWD/error.log
        echo "    $stderrTmux" >> $PWD/error.log
        echo "$stderrTmux"
    fi



echo "Script succesfuly ended"
exit 0
