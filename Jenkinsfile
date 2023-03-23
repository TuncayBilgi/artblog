pipeline {

    environment {
        DEPLOYED = 'true'
        TESTPASSED = 'false'
        BUILDED = 'false'
        LASTCOMMIT = ''
    }

    agent any
    stages {
        stage('Check Deployed') {
            steps {
                sh 'echo test > deploy.log'
                script {
                    def lastDeployed = sh(script : 'tail -n 1 deploy.log',returnStdout: true).trim()
                    echo 'lastDeploy : '
                    echo "${lastDeployed}"

                    
                    env.LASTCOMMIT  = sh( script : 'git log -1 --format=format:"%H" origin/main',returnStdout: true)
                    echo 'lastCommit :'
                    echo "${env.LASTCOMMIT}"

                    if (env.LASTCOMMIT.contains(lastDeployed)) {
                        echo 'the current main is already deployed'
                    }
                    else {
                        echo 'the current main is not deployed'
                        deployed = "false"
                    }
                    
                }
            }
        }

        stage('Test') {
            when {
                expression {
                    env.DEPLOYED == "false"
                }
            }
            steps {
                sh 'echo "test"'
                script {
                    env.TESTPASSED = "true"
                }
            }
        }

        stage('Build') {
            when {
                expression {
                    env.TESTPASSED == "true"
                }
            }
            steps {
                echo 'build'
                script {
                    env.BUILDED = "true"
                }
            }
        }

        stage('Log') {
            when {
                expression {
                    env.BUILDED == "true"
                }
            }
            steps {
                echo 'Final step reached, updating log'
                sh 'echo "${lastCommit}"'
                sh ' echo "${lastCommit}" >> deploy.log '

            }
        }
    }
}