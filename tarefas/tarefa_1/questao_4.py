



def convert4b( b, i):

    p= 0
    acc =0
    

    while i>0:

        digit = i%10
        acc+= digit * (b** p)
        p+=1
        i= i//10


    return acc


print(convert4b(5,10))
