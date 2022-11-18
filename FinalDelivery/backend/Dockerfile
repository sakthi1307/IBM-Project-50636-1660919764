FROM ubuntu:22.04
WORKDIR /
ENV SENDGRID_API_KEY='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'
ENV IBM_DB_URI='ibm_db_sa://ctc88742:2gR5h8SYMcQEcj72@19af6446-6171-4641-8aba-9dcff8e1b6ff.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud:30699/bludb;SECURITY=SSL;sslCertLocation=DigiCertGlobalRootCA.crt;sslConnection=true;'
ENV FLASK_SECRET_KEY="a82392fde49044dc7b711c7647977e9b"
ENV LD_LIBRARY=/lib64/
COPY requirements.txt /
# install app dependencies
RUN apt-get update && apt-get install -y python3 python3-pip
RUN apt-get install libxcrypt-source
RUN apt-get -y install libxml2
RUN  pip3 install -r requirements.txt
# install app
COPY app.py /
COPY DigiCertGlobalRootCA.crt /
# final configuration
# ENV FLASK_APP=hello

RUN whereis libxml2.so.2
EXPOSE 5000
CMD python3 app.py
