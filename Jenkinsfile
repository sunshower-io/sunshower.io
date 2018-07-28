pipeline {
    agent any

    environment {
        VERSION_BASE = "1.0.0"
	SITEMASTER = credentials('sitemaster')
    }

    stages {
        stage('build-docker') {
            steps {
                sh "docker system prune -af"
                sh "docker build -t stratosphere$env.BUILD_NUMBER -f Dockerfile ."
                sh "docker run " +
                        "-e SITEMASTER_GITHUB_USERNAME=${SITEMASTER_USR} " +
                        "-e SITEMASTER_GITHUB_PASSWORD=${SITEMASTER_PSW} " +
                        "--rm --name 'sunshower-site$env.BUILD_NUMBER' 'sunshower-site$env.BUILD_NUMBER'"
            }
        }
    }
}
