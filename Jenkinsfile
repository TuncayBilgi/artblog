pipeline {
    agent any

    stages {
        stage('Check for changes') {
            steps {
                script {
                    // Compare l'état de la branche principale avec celui du dernier build
                    def changes = sh(
                        script: 'git diff --name-only HEAD..origin/main',
                        returnStdout: true
                    ).trim()

                    // Si des modifications ont été détectées, renvoie 0, sinon renvoie 1
                    if (changes) {
                        env.CHANGES = '0'
                    } else {
                        env.CHANGES = '1'
                    }

                    // Met à jour la branche locale avec la branche distante
                    sh 'git pull origin main'
                }
            }
        }

        stage('Run tests') {
            when {
                expression { env.CHANGES == '0' }
            }
            steps {
                // Exécute le script de test
               // sh 'sh test.sh'
               sh 'echo  test.sh'
            }
        }

        stage('Deploy') {
            when {
                expression { env.CHANGES == '0' }
            }
            steps {
                // Exécute le script de déploiement
                /* sshagent(['my-ssh-key']) {
                    sh 'ssh user@server "cd path/to/project && git pull origin main && npm start"'
                }*/
               sh 'echo "ssh action"'
            }
        }

        stage ('terminate') {
            when {
                expression {env.CHANGES == '1'}
            }
            steps {
                sh 'echo "no changes detected"'
            }
        }
    }
}