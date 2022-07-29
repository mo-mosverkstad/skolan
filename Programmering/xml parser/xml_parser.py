from datetime import datetime

class XMLParser:
    def __init__(self):
        self.version = 1

    def file_read(self, file):
        f = open(file, "r")
        lines = f.read()
        f.close()
        return lines

    def is_opening_label(self, token):
        return token[0] == "<" and token[-1] == ">" and token[1] != "/"
    
    def is_closing_label(self, token):
        return token[0] == "<" and token[-1] == ">" and token[1] == "/"

    def tokenize(self, file):
        tokens = [""]
        for char in file:
            if char == "<":
                if tokens[-1].strip() == "":
                    tokens[-1] = ""
                else:
                    tokens.append("")
            tokens[-1] = tokens[-1] + char
            if char ==  ">":
                tokens.append("")
        tokens.pop()
        return tokens

    def parse_to_tree(self, tokens):
        stack = []
        for token in tokens:
            #print(stack)
            if self.is_opening_label(token):
                stack.append([token[1:-1], [], ""])
            elif self.is_closing_label(token):
                if len(stack) >= 2:
                    stack[-2][1].append(stack[-1])
                    stack.pop()
            else:
                stack[-1][2] = token
        return stack[0]

    def parse(self, file):
        lines = self.file_read(file)
        tokens = self.tokenize(lines)
        return self.parse_to_tree(tokens)

parser = XMLParser()
print(parser.parse("file.xml"))