from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from bs4 import BeautifulSoup
from gevent.wsgi import WSGIServer
from nltk.tokenize import RegexpTokenizer
from stop_words import get_stop_words
from nltk.stem.porter import PorterStemmer
from flask.json import dumps

import json
import urllib, urllib2
import requests
import threading
import psycopg2
import random
import operator

import argparse
import sys

from googleapiclient import discovery
import httplib2
# from oauth2client.client import GoogleCredentials
from oauth2client.service_account import ServiceAccountCredentials
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)
CORS(app)

def get_service():
    scopes = ['https://www.googleapis.com/auth/cloud-platform']
    scoped_credentials = ServiceAccountCredentials.from_json_keyfile_name(
        '/Users/imjching/Downloads/HTN1527-0dabfdd0bab3.json', scopes) # hardcode

    http = httplib2.Http()
    scoped_credentials.authorize(http)
    return discovery.build('language', 'v1beta1', http=http)


def get_native_encoding_type():
    """Returns the encoding type that matches Python's native strings."""
    if sys.maxunicode == 65535:
        return 'UTF16'
    else:
        return 'UTF32'

def analyze_syntax(text, encoding='UTF32'):
    body = {
        'document': {
            'type': 'PLAIN_TEXT',
            'language': 'EN',
            'content': text,
        },
        'features': {
            'extract_syntax': True,
        },
        'encodingType': encoding,
    }

    service = get_service()

    request = service.documents().annotateText(body=body)
    response = request.execute()

    return response


@app.route("/")
def hello():
    return "Hello World!"

from collections import Counter

@app.route("/test2")
def test2():
    # x = "Brocolli is good to eat. My brother likes to eat good brocolli, but not my mother. My mother spends a lot of time driving my brother around to baseball practice. Some health experts suggest that driving may cause increased tension and blood pressure."

    x = "Momentum must be conserved in the process, so if q1 is pushed in one direction, then q2 ought to be pushed in the other direction by the same force at the same time. However, the situation becomes more complicated when the finite speed of electromagnetic wave propagation is introduced (see retarded potential). This means that for a brief period the total momentum of the two charges is not conserved, implying that the difference should be accounted for by momentum in the fields, as asserted by Richard P. Feynman.[3] Famous 19th century electrodynamicist James Clerk Maxwell called this the \"electromagnetic momentum\".[4] Yet, such a treatment of fields may be necessary when Lenz's law is applied to opposite charges. It is normally assumed that the charges in question have the same sign. If they do not, such as a proton and an electron, the interaction is different. An electron generating a magnetic field would generate an EMF that causes a proton to accelerate in the same direction as the electron. At first, this might seem to violate the law of conservation of momentum, but such an interaction is seen to conserve momentum if the momentum of electromagnetic fields is taken into account."

    json_str =  analyze_syntax(x, get_native_encoding_type())

    json_token = json_str['tokens']
    arrayOfNouns = []

    # extract nouns
    for i in range(len(json_token)-1):
        if( json_token[i]['partOfSpeech']['tag'] == "NOUN" ):
            arrayOfNouns.append(json_token[i]['text']['content'])

    print arrayOfNouns

    dic = Counter(arrayOfNouns)
    print dic.most_common(5)
    top_three = dic.most_common(3)
    print(top_three[0][0])
    print(top_three[1][0])
    print(top_three[2][0])


    return 'hello2'


@app.route('/extract', methods=['POST'])
def test():
    count = int(request.values.get('count', 5))
    content = request.values.get('content', '')

    # tokenizer = RegexpTokenizer(r'\w+')
    # en_stop = get_stop_words('en') # create English stop words list
    # p_stemmer = PorterStemmer() # Create p_stemmer of class PorterStemmer

    # x = "Brocolli is good to eat. My brother likes to eat good brocolli, but not my mother. My mother spends a lot of time driving my brother around to baseball practice. Some health experts suggest that driving may cause increased tension and blood pressure."
    if content == "a":
        content = "Momentum must be conserved in the process, so if q1 is pushed in one direction, then q2 ought to be pushed in the other direction by the same force at the same time. However, the situation becomes more complicated when the finite speed of electromagnetic wave propagation is introduced (see retarded potential). This means that for a brief period the total momentum of the two charges is not conserved, implying that the difference should be accounted for by momentum in the fields, as asserted by Richard P. Feynman.[3] Famous 19th century electrodynamicist James Clerk Maxwell called this the \"electromagnetic momentum\".[4] Yet, such a treatment of fields may be necessary when Lenz's law is applied to opposite charges. It is normally assumed that the charges in question have the same sign. If they do not, such as a proton and an electron, the interaction is different. An electron generating a magnetic field would generate an EMF that causes a proton to accelerate in the same direction as the electron. At first, this might seem to violate the law of conservation of momentum, but such an interaction is seen to conserve momentum if the momentum of electromagnetic fields is taken into account."

    # # clean and tokenize document string
    # raw = x.lower()
    # tokens = tokenizer.tokenize(raw)
    # stopped_tokens = [i for i in tokens if not i in en_stop] # remove stop words from tokens

    # texts = list(set(stopped_tokens))
    # # texts = random.sample(texts, 4)
    # print texts
    # print "\n"


    json_str =  analyze_syntax(content, get_native_encoding_type())
    json_token = json_str['tokens']
    arrayOfNouns = []

    # extract nouns
    for i in range(len(json_token)-1):
        if(json_token[i]['partOfSpeech']['tag'] == "NOUN"):
            arrayOfNouns.append(json_token[i]['text']['content'].lower())

    dic = Counter(arrayOfNouns)
    if len(arrayOfNouns) < 3:
        return Response(status=500, response=dumps([]), mimetype="application/json")
    print arrayOfNouns
    texts = dic.most_common(3)
    texts = [texts[i][0] for i in range(3)]
    print texts
    # demo = ["physicist","Baltic German","Heinrich Lenz","Faraday's law of induction","electromagnetism","eddy currents","Newton's third law","electromagnetic induction","electric current","tesl","inductance","ferromagnets","superconductors","relationship","Maxwell's equations","retarded potential"];
    # demo = ["physicist","Faraday's law of induction","eddy currents","Newton's third law"]

    conn = psycopg2.connect(database='htn_research', user='root', host='docker-vm', port=26257)
    conn.set_session(autocommit=True) # Make each statement commit immediately.
    cur = conn.cursor()

    results = {}
    final = []
    for i in texts:
        print("select * from search_results where search_query = '" + i.replace("'", "\'\'") + "' order by created_at desc;");
        cur.execute("select * from search_results where search_query = '" + i.replace("'", "\'\'") + "' order by created_at desc;")
        rows = cur.fetchall()
        if len(rows) >= 1:
            for row in rows:
                final.append({
                    "website": row[3],
                    "picture": row[4],
                    "summary": row[5],
                    "citations": row[6],
                    "citations_list": row[7],
                    "year": row[8],
                    "classify": row[10],
                    "title": row[2]
                })
            continue # stop here
        results[i] = [] # empty array
        qs = {
            'q': i,
            'cx': '009193420556348222060:fkoekfqbncg',
            'num': 3,
            'searchType': 'image',
            'start': 1,
            'key': 'AIzaSyAQ1J58JrNhekEOggBTw5gmvqP3ZHyKgf0'
        }
        # print 'https://www.googleapis.com/customsearch/v1?' + urllib.urlencode(qs)
        data = json.load(urllib2.urlopen('https://www.googleapis.com/customsearch/v1?' + urllib.urlencode(qs)))
        threads = [threading.Thread(target=fetch_summary, args=(item, results[i])) for item in data["items"]]
        for thread in threads:
            thread.start()
        for thread in threads:
            thread.join()
        # print results[i]
        # print '\n'

    if len(results) > 0:
        sql_statement = "insert into search_results (id, search_query, title, context_link, image_link, summary, created_at, classify) values "
        for key in results:
            for row in results[key]:
                dd = json.load(urllib2.urlopen("https://api.uclassify.com/v1/uclassify/topics/Classify?readkey=eBBsvfhwh2qU&text=" + urllib.quote_plus(''.join([l if ord(l) < 128 else ' ' for l in row["summary"]]).encode('ascii', 'ignore'))))
                sql_statement += "(DEFAULT, '" + (key).replace("'", "\'\'") + "', '" + (row["title"]).replace("'", "\'\'") + "', '" + (row["contextLink"]).replace("'", "\'\'") + "', '" + (row["imageLink"]).replace("'", "\'\'") + "', '" + (row["summary"]).replace("'", "\'\'") + "', current_timestamp(), '" + str(dd).replace("'", "\'\'") + "'),"
                final.append({
                    "website": row["contextLink"],
                    "picture": row["imageLink"],
                    "summary": row["summary"],
                    "title": row["title"],
                    "classify": str(dd)
                })
        sql_statement = sql_statement[:-1] + ";"
        cur.execute(sql_statement)

    cur.close()
    conn.close()

    # now comes the matching
    # getting details of the main article
    final_again = []
    # print urllib.quote_plus(''.join([l if ord(l) < 128 else ' ' for l in content]).encode('ascii', 'ignore'))
    # print "https://api.uclassify.com/v1/uclassify/topics/Classify?readkey=eBBsvfhwh2qU&text=" + urllib.quote_plus(content)
    dd = json.load(urllib2.urlopen("https://api.uclassify.com/v1/uclassify/topics/Classify?readkey=eBBsvfhwh2qU&text=" + urllib.quote_plus(''.join([l if ord(l) < 128 else ' ' for l in content]).encode('ascii', 'ignore'))))
    top_two = sorted(dd.iteritems(), key=operator.itemgetter(1), reverse=True)[:2]
    top_two = [itemmmm[0] for itemmmm in top_two]
    print top_two

    for i in final:
        #dd = json.load(urllib2.urlopen("https://api.uclassify.com/v1/uclassify/topics/Classify?readkey=gJztb8jnKYxM&text=" + urllib.quote_plus(''.join([l if ord(l) < 128 else ' ' for l in i["summary"]]).encode('ascii', 'ignore'))))
        dd = eval(i["classify"])
        if max(dd, key=dd.get) in top_two:
            final_again.append(i)

    return Response(status=200, response=dumps(final_again), mimetype="application/json")

def fetch_summary(item, results):
    post_data = {
        "originalText" : "",
        "summaryPercent": 20,
        "sourceURL": item["image"]["contextLink"]
    }
    r = requests.post("http://sentisum.com/summarize", post_data)
    if r.status_code != 200:
        return
    soup = BeautifulSoup(r.text, "html.parser")
    summary = soup.find_all("div", {"class":"fb-share-button"})[0].parent.nextSibling.nextSibling.text

    errors = [
        "Unable to create summary",
        "Oops couldn't summarize",
        "Sorry I couldn't find enough text to sumamriz",
        "URL seems to be invalid"
    ]
    for x in errors:
        if x in summary:
            return
    results.append({
        "title": item["title"],
        "imageLink": item["link"],
        "contextLink": item["image"]["contextLink"],
        "summary": summary
    })

if __name__ == "__main__":
    # app.run(threaded=True)
    print "-> Server started on port 5000"
    http_server = WSGIServer(('', 5000), app)
    http_server.serve_forever()
