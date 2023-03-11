pipeline {
    agent any
    stages {
        stage('Check Deployed') {
            steps {
                script {
                    Deployed = 0
                    echo Deployed
                    // Récupération du nom du dernier commit sur la branche 'main'
                    def commitMessage = sh(script: 'git log -1 --pretty=%B origin/main', returnStdout: true).trim()
                    echo "Last commit message: ${commitMessage}"

                    // Vérification si le commit contient '[deployed]'
                    if (commitMessage.contains('[deployed]')) {
                        echo "Deployed detected, skipping test and build steps."
                        Deployed = 1
                    } else {
                        echo "No deployed detected, running test and build steps."
                        Deployed = 0
                        echo Deployed
                    }
                }
            }
        }

        stage('Test') {
            when {
                expression {
                    Deployed == 0
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
                    Deployed == 0
                }
            }
            steps {
                // Ajouter les étapes pour la construction de l'application
                // ...
                // Commit avec le message [deployed] pour indiquer que le déploiement a été effectué
                //sh 'git commit -am "[deployed]"'
                sh 'echo "commit"'
            }
        }
    }
}