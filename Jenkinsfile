pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    COMPOSE_FILE = 'compose-docker.yaml'
    APP_SERVICE = 'app'
    APP_URL = 'http://127.0.0.1:3000'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Verify Docker Tooling') {
      steps {
        sh '''
          docker --version
          docker compose version
        '''
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        sh '''
          set -eux
          docker compose -f "$COMPOSE_FILE" down --remove-orphans || true
          docker compose -f "$COMPOSE_FILE" up -d --build
        '''
      }
    }

    stage('Health Check') {
      steps {
        sh '''
          set -eux
          timeout 120 sh -c 'until docker compose -f "$COMPOSE_FILE" exec -T "$APP_SERVICE" wget -qO- "$APP_URL" > /dev/null; do sleep 5; done'
          docker compose -f "$COMPOSE_FILE" ps
        '''
      }
    }
  }

  post {
    always {
      sh '''
        docker compose -f "$COMPOSE_FILE" logs --no-color > docker-compose.log || true
      '''
      archiveArtifacts artifacts: 'docker-compose.log', allowEmptyArchive: true
    }

    failure {
      sh 'docker compose -f "$COMPOSE_FILE" ps || true'
    }
  }
}
