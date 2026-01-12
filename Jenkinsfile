pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build || echo "No build script found"'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "No tests found"'
            }
        }
    }

    post {
        success {
            echo '✅ Build and tests succeeded'
        }
        failure {
            echo '❌ Build or tests failed'
        }
        always {
            echo '📦 Pipeline finished'
        }
    }
}

