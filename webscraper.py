from lxml import html;
from requests import get;
from bs4 import BeautifulSoup;
from datetime import datetime;
from time import sleep;

class WebScraperCustom:
    def __init__(self):
        self.headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36"};
        self.websiteBase = "https://www.dreamstime.com/";
        self.detected403 = False;
        self.notAllowed = 403;
    
    def get(self, id):
        page = get(self.websiteBase + str(id), headers = self.headers);
        print(page.status_code);
        self.detected403 = self.detected403 or (page.status_code == self.notAllowed)
        soup = BeautifulSoup(page.content, "html.parser")
        results = soup.find(id="imageSpot")
        try:
            r = results.prettify()
            n1 = r.find('<a class="img-popup-link"')
            n2 = r[n1:].find("href=")
            n3 = r[n1:].find(">");
            link = r[n1:][n2:n3];
            link = link.replace("href", "src");
            link = "<img " + link + " alt=\"HTML5 Icon\">"
            return link;
        except:
            return "";
    
    def getRange(self, start, stop):
        results = "";
        for i in range(start, stop):
            node = self.get(i);
            results = results + node;
            print("Picture id: " + str(i) + " is currently done");
            print(node);
            sleep(5);
        return results;
    def writeRange(self, start, stop):
        f = open("index.html", "w");
        f.write(self.getRange(start, stop));
        f.close();
        
          
s = WebScraperCustom();
print(s.writeRange(14899500, 14899600));
#print(s.writeRange(14000000, 15000000));
if (s.detected403):
    print("403 Detected");
else:
    print("so good!!!");