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
                sh 'npm install'
                // sh 'tmux new-session -d -s artblogDeamon "npm run dev"'

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
                withCredentials([string(credentialsId : 'f1db7dfd-4e52-4378-8078-c36639f8e1a3',variable:'GRAPHCMS_TOKEN'),string(credentialsId : '187cc787-35e8-4115-865e-62914fc14582',variable:'NEXT_PUBLIC_GRAPHCMS_ENDPOINT')]){
                    // withEnv(['NEXT_PUBLIC_GRAPHCMS_ENDPOINT=$NEXT_PUBLIC_GRAPHCMS_ENDPOINT','GRAPHCMS_TOKEN=$GRAPHCMS_TOKEN']){
                    //     sh 'npx jest'
                    // }
                    sh 'export NEXT_PUBLIC_GRAPHCMS_ENDPOINT=$NEXT_PUBLIC_GRAPHCMS_ENDPOINT && export GRAPHCMS_TOKEN=$GRAPHCMS_TOKEN'

                    script{
                        def testStatus = sh(returnStatus: true, script: "npx jest")

                        if (testStatus == 0) {
                        testPassed = "true"
                        } else {
                        testPassed = "false"
                        }
                    }

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
                    script {
                        def buildStatus = sh(returnStatus: true, script: "ssh curcuma@ovh1.ec-m.fr 'bash ./node/artblog/publish.sh -b' ")
                        if (buildStatus == 0) {
                        builded = "true"
                        } else {
                        builded = "false"
                        }
                    }    
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
                    def deployLogs = readFile(file :'deploy.log')
                    def newfile = deployLogs + "\n\r${lastCommit}"
                    writeFile(file :'deploy.log',text : "${newfile}")
                    def newDeploysLogs = readFile(file :'deploy.log')
                    echo "${newDeploysLogs}"
                }
            }
        }
    }
}