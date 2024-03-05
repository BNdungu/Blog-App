pipeline {
  agent any
  stages {
    stage('git checkout') {
      steps {
        git(url: 'https://github.com/BNdungu/Blog-App.git', branch: 'main')
      }
    }

    stage('log') {
      steps {
        sh 'ls -la'
      }
    }

    stage('build') {
      steps {
        sh 'docker-compose -f docker-compose.yml -f docker-compose-prod.yml build'
      }
    }

  }
}