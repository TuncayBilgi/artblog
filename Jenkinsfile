def deployed = 'true'
def testPassed = 'false'
def builded = 'false'
def lastCommit = ''

pipeline {
    agent any
    stages {
        stage('Check Deployed') {
            steps {
                script {
                
                    def lastDeployed = sh(script : 'tail -n 1 deploy.log',returnStdout: true).trim()
                    echo 'lastDeploy : '
                    echo "${lastDeployed}"

                    
                    lastCommit  = sh( script : 'git log -1 --format=format:"%H" origin/main',returnStdout: true)
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

        stage('Preparing working environment') {
            when {
                expression {
                    deployed == "false"
                }
            }
            steps {
                echo 'Setup ...'
                script {
                    npm install
                    npm run dev
                    exit
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
                echo 'testing ...'
                script {
                    testPassed = "true"
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
                echo 'building ...'

                sshagent(credentials : ['a5924c01-d4f9-4494-9a63-8aa52623328c']) {  
                    sh "ssh curcuma@ovh1.ec-m.fr 'bash ./node/artblog/publish.sh -h' "      
                }

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
                    def test = readFile(file :'deploy.log')
                    def newfile = test + "\n\r${lastCommit}"
                    writeFile(file :'deploy.log',text : "${newfile}")
                    def test2 = readFile(file :'deploy.log')
                    echo "${test2}"
                }
            }
        }
    }
}