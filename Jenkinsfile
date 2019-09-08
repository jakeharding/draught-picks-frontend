node {
  load "${JENKINS_HOME}/project_props/draught-picks-frontend.properties"
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
        git remote set-url origin git@github.com:jakeharding/draught-picks-frontend.git
        echo "REST_API_ROOT=http://localhost:8000/api/dev" > .env
        echo >> .env
        echo "GA_ENV=dev" >> .env
        echo >> .env
        echo "repo_token: $COVERALLS_TOKEN" > .coveralls.yml
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
      when  {
        expression { !env.BRANCH_NAME.startsWith('PR') }
      }
      steps {
        //TODO Write URLs to .env
        sh '''
        #!/bin/bash
        yarn build
        '''
        script {
          def packageJson = readJSON file:'package.json'

          sh 'git pull -t'
          def tag = sh(returnStdout: true, script: "git tag --sort version:refname | tail -1").trim()
          def (major, minor, patch) = extractVersion(tag)
          patch =  patch.toInteger() + 1
          String newVersion = "${major}.${minor}.${patch}rc"
          println "Writing ${newVersion} to package.json"
          packageJson.version = newVersion
          writeJSON file: 'package.json', json: packageJson, pretty: 4
          println "Tagging ${newVersion} to Git"
          sh "git tag ${newVersion} && git push --tags"
        }
      }
    }
    stage('zip') {
      when {
        expression { env.BRANCH_NAME == 'dev' }
      }
      steps {
        sh 'rm bundle.zip'
        zip zipFile: 'bundle.zip', archive: true, dir: './www/'
      }
    }
    stage('ship') {
      when {
        expression { env.BRANCH_NAME == 'dev' }
      }
      steps {
        sh '''
        #!/bin/bash
        echo "SHIP IT WITH THE PUBLISH OVER SSH PLUGIN?"
        '''
      }
    }
  }
}

@NonCPS
def extractVersion(tag) {
    def m = tag =~ /\d+/
    return [m[0].getAt(0), m[1].getAt(0), m[2].getAt(0)]
}
