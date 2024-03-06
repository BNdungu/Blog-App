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

    stage('login to dockerhub') {
      steps {
        sh 'docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASSWORD'
      }
    }

    stage('push image') {
      steps {
        sh 'docker-compose -f docker-compose.yml -f docker-compose-prod.yml push  '
      }
    }

  }
  environment {
    DOCKERHUB_USER = 'nganga1'
    DOCKERHUB_PASSWORD = 'dckr_pat_qDU1woD_VpNJmTEnCt1DJ0pICow'
  }
}