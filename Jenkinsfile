pipeline {
  agent any
  environment {
    PROJECT_NAME="draught-picks-frontend"
  }
  tools { nodejs 'node; }'
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
        pwd
        '''
      }
    }
    stage('deps') {
      steps {
        sh '''
        #!/bin/bash
        which yarn
        '''
      }
    }

    stage('test') {
      steps {
        sh '''
        #!/bin/bash
        echo "Run tests"
        '''
      }
    }
  }
}
