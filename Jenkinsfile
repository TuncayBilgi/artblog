pipeline {
    agent any
    stages {
        stage('Check Deployed') {
            steps {
                script {
                    //sh 'git checkout main'
                    // init
                    deployed = "true"
                    // Récupération du nom du dernier commit sur la branche 'main'
                    def commitMessage = sh(script: 'git log -1 --pretty=%B origin/main', returnStdout: true).trim()
                    echo "Last commit message: ${commitMessage}"

                    // Vérification si le commit contient '[deployed]'
                    if (commitMessage.contains('[deployed]')) {
                        echo "deployed detected, skipping test and build steps."
                        deployed = "true"
                    } else {
                        echo "No deployed detected, running test and build steps."
                        deployed = "false"
                        echo deployed
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
                // Ajouter les étapes pour les tests
                sh 'echo "test"'
            }
        }

        stage('Build') {
            when {
                expression {
                    deployed == "false"
                }
            }
            steps {
                // Ajouter les étapes pour la construction de l'application
                // ...
                // Commit avec le message [deployed] pour indiquer que le déploiement a été effectué
                sh 'echo "final steps"'
                //sshagent(credentials : ['a5924c01-d4f9-4494-9a63-8aa52623328c']) {
                  //  sh 'ssh -o StrictHostKeyChecking=no curcuma@ovh1.ec-m.fr uptime'
                   // sh 'ssh curcuma@ovh1.ec-m.fr ./node/artblog/test.sh '
                //}
                //sshagent(credentials : ['b4bccb48-8de0-4d28-806e-573dc2067a47']) {          
                    //sh 'git remote rm origin'
                    //sh 'git remote add origin "git@github.com:TuncayBilgi/artblog.git"'
                    //sh 'git commit --allow-empty -m "[deployed]"'
                    //sh 'git push origin main'
                //}
                script {
                    
                    //def deployLog = readFile "/tmp/deploy.log"
                    
                    echo 'test' >> ./deploy.log

                    //echo "${deployLog}"
                    def lastDeployed = sh(script : 'tail -n 1 ./deploy.log',returnStdout: true).trim()
                    echo 'lastDeploy : '
                    echo "${lastDeployed}"

                    echo 'lastcommit'
                    def lastCommit  = sh( script : 'git log -1 --format=format:"%H" origin/main',returnStdout: true)

                    if (lastCommit.contains(lastDeployed)) {
                        echo 'the current main is already deployed'
                    }
                    else {
                        echo 'the current main is not deployed'
                    }
                    echo 'lastcommit is'
                    echo "${lastCommit}" >> ./deploy.log

                }
                
                
            }
        }
    }
}