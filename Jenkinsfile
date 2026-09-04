pipeline {
    agent {
        label 'docker'
    }

    options {
        timestamps()
    }

    stages {
        stage('Git Pull') {
            steps {
                sh '''
                git clone https://github.com/dhandesaurav52/techgenx
                '''
            }
        }
        stage('node install') {
            steps {
                sh '''
                  apt install nodejs
                '''
            }

        stage('Run Shell') {
            steps {
                sh '''
                  npm install
                '''
            }
        stage('build') {
            steps {
                sh '''
                  npm run build
                '''
            }
        stage('build') {
            steps {
                sh '''
                  npm run dev
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }

        success {
            echo 'Build Successful!'
        }

        failure {
            echo 'Build Failed!'
        }
    }
}
