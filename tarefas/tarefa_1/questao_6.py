from  questao_4 import convert4b
from questao_5 import decToB


def convertBases( intput_base, n, output_base ):

    dec = convert4b(intput_base,n)

    return decToB(output_base,dec)


print(convertBases(2,1000,16))