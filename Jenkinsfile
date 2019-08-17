node {
  load "local.properties"
}
pipeline {
  agent any
  environment {
    PATH="/usr/local/bin:$PATH"
    PROJECT_NAME="draught-picks-frontend"
  }
  tools { nodejs "NodeTen" }
  stages {
    stage('env') {
      steps {
        script {
          if (env.BRANCH_NAME.startsWith('PR')) {
            env.JOB_BASE_NAME = "${env.CHANGE_BRANCH}"
          }
        }
        sh '''
        #!/bin/bash
        echo "REST_API_ROOT=http://localhost:8000/api/dev" > .env
        echo >> .env
        echo "GA_ENV=dev" >> .env
        echo >> .env
        '''
      }
    }
    stage('deps') {
      steps {
        sh '''
        #!/bin/bash
        yarn install
        '''
      }
    }

    stage('test') {
      steps {
        sh '''
        #!/bin/bash
        yarn test:ci
        '''
      }
    }

    stage('build') {
      steps {
        sh '''
        #!/bin/bash
        yarn build
        '''
      }
    }
  }
}
