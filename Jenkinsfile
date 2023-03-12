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
                sh 'ssh curcuma@ovh1.ec-m.fr ./node/artblog/test.sh '
            }
        }
    }
}