#!/usr/bin/env groovy

pipeline {
    agent any 
    stages {
        stage('Stage 1') {
            steps {
                echo 'trying new pipelinde' 
            }
        }


        stage('Check file') {
            steps {
                // Check if the file "jenkins-test.txt" exists in the "dev" branch
                sh 'git ls-tree --full-tree -r HEAD --name-only | grep "jenkins-test.txt" || exit 1'
            }
        }
        stage('Push file') {
            steps {
                // Check out the "jenkins" branch
                sh 'git checkout MyJenkins'
                // Create a new file named "jenkins_log.txt"
                sh 'echo "jenkins_log.txt created" > jenkins_log.txt'
                // Add the new file to the staging area
                sh 'git add jenkins_log.txt'
                // Commit the changes
                sh 'git commit -m "Add jenkins_log.txt"'
                // Push the changes to the "jenkins" branch
                sh 'git push origin jenkins'
            }
        }

    }

}

