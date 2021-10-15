from xml.etree.ElementTree import *;
import PySimpleGUI as sg;

class E3PlusViewer:
    def __init__(self):
        self.árbol = parse('e3+.xml');
        self.raíz = self.árbol.getroot();
        self.layout = [];
        self.a = [];
        
    def verConsola(self):
        for página in self.árbol.findall("página"):
            print(" - " + página.get("título"));
            for seq in página.findall("seq"):
                print(seq.text);

    def createLayout(self):
        for página in self.árbol.findall("página"):
            self.layout.append([sg.Text(" - " + página.get("título"))]);
            for seq in página.findall("seq"):
                self.a.append([sg.Text(seq.text)]);
            
e = E3PlusViewer();
e.verConsola();
e.createLayout();
#print(e.layout);
#layout = [[sg.Text("aa")], [sg.Text("bb")]];

# Create the window
window = sg.Window("Demo", e.layout);


# Create an event loop
while True:
    event, values = window.read()
    # End program if user closes window or
    # presses the OK button
    if event == "OK" or event == sg.WIN_CLOSED:
        break

window.close();
