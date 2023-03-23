def deployed = 'true'
def testPassed = 'false'
def builded = 'false'
def lastCommit = ''

pipeline {
    agent any
    stages {
        stage('Check Deployed') {
            steps {
                sh 'echo "test" > deploy.log'
                script {
                
                    def lastDeployed = sh(script : 'tail -n 1 deploy.log',returnStdout: true).trim()
                    echo 'lastDeploy : '
                    echo "${lastDeployed}"

                    
                    def lastCommit  = sh( script : 'git log -1 --format=format:"%H" origin/main',returnStdout: true)
                    echo 'lastCommit :'
                    echo "${lastCommit}"

                    if (lastCommit.contains(lastDeployed)) {
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
                    deployed == "false"
                }
            }
            steps {
                sh 'echo "test"'
                script {
                    echo "${lastCommit}"
                    test_passed = "true"
                }
            }
        }

        stage('Build') {
            when {
                expression {
                    testPassed == "true"
                }
            }
            steps {
                echo 'build'
                script {
                    builded = "true"
                }
            }
        }

        stage('Log') {
            when {
                expression {
                    builded == "true"
                }
            }
            steps {
                echo 'Final step reached, updating log'
                script {
                    echo "${lastCommit}"
                    writeFile('deploy.log','testlog')
                    def test = readFile('deploy.log')
                    echo "${test}"
                }
            }
        }
    }
}