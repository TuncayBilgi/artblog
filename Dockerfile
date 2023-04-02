FROM jenkins/jenkins:lts-alpine-jdk11

USER root

RUN apk update && apk add nodejs npm
RUN apk add tmux

USER jenkins
