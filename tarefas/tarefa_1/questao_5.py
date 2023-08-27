


def decToB( b,dec):

    if b==10:
        return str(dec)

    hexa = {
        10:'a',
        11:'b',
        12:'c',
        13:'d',
        14:'e',
        15:'f'
    }

    out =[]
    while(dec >0):
        
        digit = dec%b
        
        if digit>9:
            digit = hexa[digit]

        out.append(str(digit))
        dec = dec//b

    return ''.join(out[::-1])



        

