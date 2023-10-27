// hexadecimal to binary converter
const hexToBin = {
    '0': '0000', '1': '0001', '2': '0010', '3': '0011', '4': '0100',
    '5': '0101', '6': '0110', '7': '0111', '8': '1000', '9': '1001',
    'a': '1010', 'b': '1011', 'c': '1100', 'd': '1101', 'e': '1110', 'f': '1111'
}

// hexadecimal(ascii) to character converter
const hexToChar = {
    // number characters
    '30': '0', '31': '1', '32': '2', '33': '3', '34': '4', '35': '5', '36': '6', '37': '7', '38': '8',
    '39': '0',

    // alphabetic characters
    '61': 'a', '62': 'b', '63': 'c', '64': 'd', '65': 'e', '66': 'f', '67': 'g', '68': 'h', '69':'i',
    '6a':'j', '6b':'k', '6c':'l', '6d':'m', '6e':'n', '6f':'o', '70':'p', '71':'q', '72':'r', '73':'s',
    '74':'t', '75':'u', '76':'v', '77':'w', '78':'x', '79':'y', '7a':'z', '41':'A', '42':'B', '43':'C',
    '44':'D', '45':'E', '46':'F', '47':'G', '48':'H', '49':'I', '4a':'J', '4b':'K', '4c':'L', '4d':'M', '4e':'N',
    '4f':'O', '50':'P', '51':'Q', '52':'R', '53':'S', '54':'T', '55':'U', '56':'V', '57':'W', '58':'X', '59':'Y', '5a':'Z'
}


// Initial permutation 1

/**
 * key awal adalah matrix 8x8
 * dengan value urut kiri ke kanan & atas ke bawah 1-64
 * lalu tiap kolom kelipatan 8 akan dihapus sehingga menjadi 56-bit
 * key diacak
 * 4 baris pertama adalah value genap
 * 4 baris kedua adalah value ganjil
 */
const initPermut = [
    58, 50, 42, 34, 26, 18, 10,  2, 
    60, 52, 44, 36, 28, 20, 12,  4, 
    62, 54, 46, 38, 30, 22, 14,  6, 
    64, 56, 48, 40, 32, 24, 16,  8, 
    57, 49, 41, 33, 25, 17,  9,  1, 
    59, 51, 43, 35, 27, 19, 11,  3, 
    61, 53, 45, 37, 29, 21, 13,  5, 
    63, 55, 47, 39, 31, 23, 15,  7,
]

const PC1 = [
    57, 49, 41, 33,  25,  17,  9,
     1, 58, 50, 42,  34,  26, 18,
    10,  2, 59, 51,  43,  35, 27,
    19, 11,  3, 60,  52,  44, 36,
    63, 55, 47, 39,  31,  23, 15,
     7, 62, 54, 46,  38,  30, 22,
    14,  6, 61, 53,  45,  37, 29,
    21, 13,  5, 28,  20,  12,  4,
]

const PC2 = [
    14,  17,  11,  24,   1,   5,
    3,   28,  15,   6,  21,  10,
    23,  19,  12,   4,  26,   8,
    16,   7,  27,  20,  13,   2,
    41,  52,  31,  37,  47,  55,
    30,  40,  51,  45,  33,  48,
    44,  49,  39,  56,  34,  53,
    46,  42,  50,  36,  29,  32
]

// invers IP
const invertIP = [
    40, 8, 48, 16, 56, 24, 64, 32, 
    39, 7, 47, 15, 55, 23, 63, 31, 
    38, 6, 46, 14, 54, 22, 62, 30, 
    37, 5, 45, 13, 53, 21, 61, 29, 
    36, 4, 44, 12, 52, 20, 60, 28, 
    35, 3, 43, 11, 51, 19, 59, 27, 
    34, 2, 42, 10, 50, 18, 58, 26, 
    33, 1, 41,  9, 49, 17, 57, 25,
]

// expansion table
const expansionTable = [
    32,    1,  2,  3,  4,    5,  
     4,    5,  6,  7,  8,    9,  
     8,    9, 10, 11, 12,   13, 
    12,   13, 14, 15, 16,   17, 
    16,   17, 18, 19, 20,   21, 
    20,   21, 22, 23, 24,   25, 
    24,   25, 26, 27, 28,   29, 
    28,   29, 30, 31, 32,    1,
]

const pBoxes = [
    16,  7, 20, 21, 
    29, 12, 28, 17, 
     1, 15, 23, 26, 
     5, 18, 31, 10, 
     2,  8, 24, 14, 
    32, 27,  3,  9, 
    19, 13, 30,  6, 
    22, 11,  4, 25,
]

// Substitution box
const sBoxes = [
    {

        '000000':'1110', '000010':'0100', '000100':'1101', '000110':'0001', '001000':'0010', '001010':'1111', '001100':'1011', '001110':'1000',
        '010000':'0011', '010010':'1010', '010100':'0110', '010110':'1100', '011000':'0101', '011010':'1001', '011100':'0000', '011110':'0111',
        '000001':'0000', '000011':'1111', '000101':'0111', '000111':'0100', '001001':'1110', '001011':'0010', '001101':'1101', '001111':'0001',
        '010001':'1010', '010011':'0110', '010101':'1100', '010111':'1011', '011001':'1001', '011011':'0101', '011101':'0011', '011111':'1000',
        '100000':'0100', '100010':'0001', '100100':'1110', '100110':'1000', '101000':'1101', '101010':'0110', '101100':'0010', '101110':'1011',
        '110000':'1111', '110010':'1100', '110100':'1001', '110110':'0111', '111000':'0011', '111010':'1010', '111100':'0101', '111110':'0000',
        '100001':'1111', '100011':'1100', '100101':'1000', '100111':'0010', '101001':'0100', '101011':'1001', '101101':'0001', '101111':'0111',
        '110001':'0101', '110011':'1011', '110101':'0011', '110111':'1110', '111001':'1010', '111011':'0000', '111101':'0110', '111111':'1101'
        
    },
    {

        '000000':'1111', '000010':'0001', '000100':'1000', '000110':'1110', '001000':'0110', '001010':'1011', '001100':'0011', '001110':'0100',
        '010000':'1001', '010010':'0111', '010100':'0010', '010110':'1101', '011000':'1100', '011010':'0000', '011100':'0101', '011110':'1010',
        '000001':'0011', '000011':'1101', '000101':'0100', '000111':'0111', '001001':'1111', '001011':'0010', '001101':'1000', '001111':'1110',
        '010001':'1100', '010011':'0000', '010101':'0001', '010111':'1010', '011001':'0110', '011011':'1001', '011101':'1011', '011111':'0101',
        '100000':'0000', '100010':'1110', '100100':'0111', '100110':'1011', '101000':'1010', '101010':'0100', '101100':'1101', '101110':'0001',
        '110000':'0101', '110010':'1000', '110100':'1100', '110110':'0110', '111000':'1001', '111010':'0011', '111100':'0010', '111110':'1111',
        '100001':'1101', '100011':'1000', '100101':'1010', '100111':'0001', '101001':'0011', '101011':'1111', '101101':'0100', '101111':'0010',
        '110001':'1011', '110011':'0110', '110101':'0111', '110111':'1100', '111001':'0000', '111011':'0101', '111101':'1110', '111111':'1001'
        
    },
    {

        '000000':'1010', '000010':'0000', '000100':'1001', '000110':'1110', '001000':'0110', '001010':'0011', '001100':'1111', '001110':'0101',
        '010000':'0001', '010010':'1101', '010100':'1100', '010110':'0111', '011000':'1011', '011010':'0100', '011100':'0010', '011110':'1000',
        '000001':'1011', '000011':'0111', '000101':'0000', '000111':'1001', '001001':'0011', '001011':'0100', '001101':'0110', '001111':'1010',
        '010001':'0010', '010011':'1000', '010101':'0101', '010111':'1110', '011001':'1100', '011011':'1011', '011101':'1111', '011111':'0001',
        '100000':'1101', '100010':'0110', '100100':'0100', '100110':'1001', '101000':'1000', '101010':'1111', '101100':'0011', '101110':'0000',
        '110000':'1011', '110010':'0001', '110100':'0010', '110110':'1100', '111000':'0101', '111010':'1010', '111100':'1110', '111110':'0111',
        '100001':'0001', '100011':'1010', '100101':'1011', '100111':'0000', '101001':'0110', '101011':'1001', '101101':'1000', '101111':'0111',
        '110001':'0100', '110011':'1111', '110101':'1110', '110111':'0011', '111001':'1011', '111011':'0101', '111101':'0010', '111111':'1100'
        
    },
    {

        '000000':'0111', '000010':'1101', '000100':'1110', '000110':'0011', '001000':'0000', '001010':'0110', '001100':'1001', '001110':'1010',
        '010000':'0001', '010010':'0010', '010100':'1000', '010110':'0101', '011000':'1011', '011010':'1100', '011100':'0100', '011110':'1111',
        '000001':'1101', '000011':'1000', '000101':'1101', '000111':'0101', '001001':'0110', '001011':'1111', '001101':'0000', '001111':'0011',
        '010001':'0100', '010011':'0111', '010101':'0010', '010111':'1100', '011001':'0001', '011011':'1010', '011101':'1110', '011111':'1001',
        '100000':'1010', '100010':'0110', '100100':'1001', '100110':'0000', '101000':'1100', '101010':'1011', '101100':'0111', '101110':'1101',
        '110000':'1111', '110010':'0001', '110100':'0011', '110110':'1101', '111000':'0101', '111010':'0010', '111100':'1000', '111110':'0100',
        '100001':'0011', '100011':'1111', '100101':'0000', '100111':'0110', '101001':'1010', '101011':'0001', '101101':'1101', '101111':'1000',
        '110001':'1001', '110011':'0100', '110101':'0101', '110111':'1011', '111001':'1100', '111011':'0111', '111101':'0010', '111111':'1110'
        
    },
    {

        '000000':'0010', '000010':'1100', '000100':'0100', '000110':'0001', '001000':'0111', '001010':'1010', '001100':'1011', '001110':'0110',
        '010000':'1000', '010010':'0101', '010100':'0011', '010110':'1111', '011000':'1101', '011010':'0000', '011100':'1110', '011110':'1001',
        '000001':'1110', '000011':'1011', '000101':'0010', '000111':'1100', '001001':'0100', '001011':'0111', '001101':'1101', '001111':'0001',
        '010001':'0101', '010011':'0000', '010101':'1111', '010111':'1010', '011001':'0011', '011011':'1001', '011101':'1000', '011111':'0110',
        '100000':'0100', '100010':'0010', '100100':'0001', '100110':'1011', '101000':'1010', '101010':'1101', '101100':'0111', '101110':'1000',
        '110000':'1111', '110010':'1001', '110100':'1100', '110110':'0101', '111000':'0110', '111010':'0011', '111100':'0000', '111110':'0100',
        '100001':'1011', '100011':'1000', '100101':'1100', '100111':'0111', '101001':'0001', '101011':'1110', '101101':'0010', '101111':'1101',
        '110001':'0110', '110011':'1111', '110101':'0000', '110111':'1001', '111001':'1010', '111011':'0100', '111101':'0101', '111111':'0011'
        
    },
    {

        '000000':'1100', '000010':'0001', '000100':'1010', '000110':'1111', '001000':'1001', '001010':'0010', '001100':'0110', '001110':'1000',
        '010000':'0000', '010010':'1101', '010100':'0011', '010110':'0100', '011000':'1110', '011010':'0111', '011100':'0101', '011110':'1011',
        '000001':'1010', '000011':'1111', '000101':'0100', '000111':'0010', '001001':'0111', '001011':'1100', '001101':'1001', '001111':'0101',
        '010001':'0110', '010011':'0001', '010101':'1101', '010111':'1110', '011001':'0000', '011011':'1011', '011101':'0011', '011111':'1000',
        '100000':'1001', '100010':'1110', '100100':'1111', '100110':'0101', '101000':'0010', '101010':'1000', '101100':'1100', '101110':'0011',
        '110000':'0111', '110010':'0000', '110100':'0100', '110110':'1010', '111000':'0001', '111010':'1101', '111100':'1011', '111110':'0110',
        '100001':'0100', '100011':'0011', '100101':'0010', '100111':'1100', '101001':'1001', '101011':'0101', '101101':'1111', '101111':'1010',
        '110001':'1011', '110011':'1110', '110101':'0001', '110111':'0111', '111001':'0110', '111011':'0000', '111101':'1000', '111111':'1101'
        
    },
    {

        '000000':'0100', '000010':'1011', '000100':'0010', '000110':'1110', '001000':'1111', '001010':'0000', '001100':'1000', '001110':'1101',
        '010000':'0011', '010010':'1100', '010100':'1001', '010110':'0111', '011000':'0101', '011010':'1010', '011100':'0110', '011110':'0001',
        '000001':'1101', '000011':'0000', '000101':'1011', '000111':'0111', '001001':'0100', '001011':'1001', '001101':'0001', '001111':'1010',
        '010001':'1110', '010011':'0011', '010101':'0101', '010111':'1100', '011001':'0010', '011011':'1111', '011101':'1000', '011111':'0110',
        '100000':'0001', '100010':'0100', '100100':'1011', '100110':'1101', '101000':'1100', '101010':'0011', '101100':'0111', '101110':'1110',
        '110000':'1010', '110010':'1111', '110100':'0110', '110110':'1000', '111000':'0000', '111010':'0101', '111100':'1001', '111110':'0010',
        '100001':'0110', '100011':'1011', '100101':'1101', '100111':'1000', '101001':'0001', '101011':'0100', '101101':'1010', '101111':'0111',
        '110001':'1001', '110011':'0101', '110101':'0000', '110111':'1111', '111001':'1110', '111011':'0010', '111101':'0011', '111111':'1100'
        
    },
    {

        '000000':'1101', '000010':'0010', '000100':'1000', '000110':'0100', '001000':'0110', '001010':'1111', '001100':'1011', '001110':'0001',
        '010000':'1010', '010010':'1001', '010100':'0011', '010110':'1110', '011000':'0101', '011010':'0000', '011100':'1100', '011110':'0111',
        '000001':'0001', '000011':'1111', '000101':'1101', '000111':'1000', '001001':'1010', '001011':'0011', '001101':'0111', '001111':'0100',
        '010001':'1100', '010011':'0101', '010101':'0110', '010111':'1011', '011001':'0000', '011011':'1110', '011101':'1001', '011111':'0010',
        '100000':'0111', '100010':'1011', '100100':'0100', '100110':'0001', '101000':'1001', '101010':'1100', '101100':'1110', '101110':'0010',
        '110000':'0000', '110010':'0110', '110100':'1010', '110110':'1101', '111000':'1111', '111010':'0011', '111100':'0101', '111110':'1000',
        '100001':'0010', '100011':'0001', '100101':'1110', '100111':'0111', '101001':'0100', '101011':'1010', '101101':'1000', '101111':'1101',
        '110001':'1111', '110011':'1100', '110101':'1001', '110111':'0000', '111001':'0011', '111011':'0101', '111101':'0110', '111111':'1011'
        
    },
]

// pola left shift tiap iterasi
// const iterationLeftShift = [
// /*  1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16 */
//     1,  1,  2,  2,  2,  2,  2,  2,  1,  2,  2,  2,  2,  2,  2,  1
// ]

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * encrypt function
 */
const encryptMsgAPI = (req, res) => {
    const key = req.body.key.toLowerCase()
    const message = req.body.message.toLowerCase()

    if (key.length !== 8)
    {
        // alert('initial key must be 8 characters long!')
        res.json({
            status: 400,
            message: 'key must be 8 characters long!',
        }).end()
    }

    else if (message.length !== 8)
    {
        res.json({
            status: 400,
            message: 'message must be 8 characters long!',
        }).end()
    }
    
    else
    {
        // 1. convert plain text into binary=======================================================
        const hexMessage = Buffer.from(message, 'utf-8').toString('hex')
        let tempMessage = []    // temporary key contain hexMessage
        let sMessage = ""       // container and joiner string for binary message

        // loop and check to convert message from hex to bin
        for (let iMsg = 0; iMsg < hexMessage.length; iMsg++)
        {
            for (let msg in hexToBin)
            {
                if (hexMessage[iMsg] === msg) tempMessage.push(hexToBin[msg])
            }
            
        }
        console.log('test')
        console.log(hexMessage)

        // concate binary message to this string
        const binaryMessage = sMessage.concat(tempMessage.join(''))
        console.log(binaryMessage)
        // @end 1. convert plain text into binary====================================================

        // 2. Permutate message with IP table========================================================
        let tempIPMsg = []
        let msgIP = ""
        for (let ipIndex = 0; ipIndex < initPermut.length; ipIndex++)
        {
            tempIPMsg.push(binaryMessage[initPermut[ipIndex] - 1])
        }

        msgIP = msgIP.concat(tempIPMsg.join(''))
        console.log("tempIPmsg: " + msgIP)
        console.log(tempMessage)
        // @end 2. Permutate message with IP table===================================================

        // 3. Divided permuted message into let and right side===========================================
        const L0 = msgIP.slice(0, 32)
        const R0 = msgIP.slice(32, 64)

        console.log(`L0: ${L0}`)
        console.log(`R0: ${R0}`)
        // stop right there before continuing message enchypering
        // @end 3. Divided permuted message into let and right side===========================================


        // 4. convert key to hex first and then to binary==========================================================
        const hexKey = Buffer.from(key, 'utf-8').toString('hex')
        console.log(hexKey)

        let tempKey = []       // temporary key contain hexKey
        let sKey = ""          // container and joiner string for binary keys

        // loop and check to convert key from hex to bin
        for(let iKey = 0; iKey < hexKey.length; iKey++)
        {
            for(let key in hexToBin)
            {
                if (hexKey[iKey] === key) tempKey.push(hexToBin[key])
            }
            console.log('test')
            console.log(hexKey[iKey])
        }

        // concate binary keys to this string
        const binaryKey = sKey.concat(tempKey.join(''))
        console.log(binaryKey)
        // @end 4. convert key to hex first and then to binary==========================================================


        
        // 5. Permutate key with PC1 table (compress from 64 bit to 56 bit)======================================================
        let tempPCKey = []
        sKey = ""
        for (let i = 0; i < PC1.length; i++)
        {
            tempPCKey.push(binaryKey[PC1[i] - 1])
        }

        const pc1Key = sKey.concat(tempPCKey.join(""))
        console.log(`Key after permutated with PC1: ${pc1Key}`)
        // @end 5. Permutate key with PC1 table (compress from 64 bit to 56 bit)======================================================
        
        // 6. Left shift key 16 times to generate 16 internal key================================================================================================================
        // Key PC
        let leftKey0  = pc1Key.slice(0, 28)
        let rightKey0 = pc1Key.slice(28, 56) 

        // Key round: 1, left shift: 1
        let leftKey1  = leftKey0.slice(1, 28)  + leftKey0[0]  
        let rightKey1 = rightKey0.slice(1, 28) + rightKey0[0]  

        // Key round: 2, left shift: 1
        let leftKey2  = leftKey1.slice(1, 28)  + leftKey1[0]
        let rightKey2 = rightKey1.slice(1, 28) + rightKey1[0]
        // Key round: 3, left shift: 2
        let leftKey3  = leftKey2.slice(2, 28)  + leftKey2[0]  + leftKey2[1]
        let rightKey3 = rightKey2.slice(2, 28) + rightKey2[0] + rightKey2[1]

        // Key round: 4, left shift: 2
        let leftKey4  = leftKey3.slice(2, 28)  + leftKey3[0]  + leftKey3[1]
        let rightKey4 = rightKey3.slice(2, 28) + rightKey3[0] + rightKey3[1]

        // Key round: 5, left shift: 2
        let leftKey5  = leftKey4.slice(2, 28)  + leftKey4[0]  + leftKey4[1]
        let rightKey5 = rightKey4.slice(2, 28) + rightKey4[0] + rightKey4[1]

        // Key round: 6, left shift: 2
        let leftKey6  = leftKey5.slice(2, 28)  + leftKey5[0]  + leftKey5[1]
        let rightKey6 = rightKey5.slice(2, 28) + rightKey5[0] + rightKey5[1]

        // Key round: 7, left shift: 2
        let leftKey7  = leftKey6.slice(2, 28)  + leftKey6[0]  + leftKey6[1]
        let rightKey7 = rightKey6.slice(2, 28) + rightKey6[0] + rightKey6[1]

        // Key round: 8, left shift: 2
        let leftKey8  = leftKey7.slice(2, 28)  + leftKey7[0]  + leftKey7[1]
        let rightKey8 = rightKey7.slice(2, 28) + rightKey7[0] + rightKey7[1]

        // Key round: 9, left shift: 1
        let leftKey9  = leftKey8.slice(1, 28)  + leftKey8[0]
        let rightKey9 = rightKey8.slice(1, 28) + rightKey8[0]

        // Key round: 10, left shift: 2
        let leftKey10  = leftKey9.slice(2, 28)  + leftKey9[0]  + leftKey9[1]
        let rightKey10 = rightKey9.slice(2, 28) + rightKey9[0] + rightKey9[1]

        // Key round: 11, left shift: 2
        let leftKey11  = leftKey10.slice(2, 28)  + leftKey10[0]  + leftKey10[1]
        let rightKey11 = rightKey10.slice(2, 28) + rightKey10[0] + rightKey10[1]

        // Key round: 12, left shift: 2
        let leftKey12  = leftKey11.slice(2, 28)  + leftKey11[0]  + leftKey11[1]
        let rightKey12 = rightKey11.slice(2, 28) + rightKey11[0] + rightKey11[1]

        // Key round: 13, left shift: 2
        let leftKey13  = leftKey12.slice(2, 28)  + leftKey12[0]  + leftKey12[1]
        let rightKey13 = rightKey12.slice(2, 28) + rightKey12[0] + rightKey12[1]

        // Key round: 14, left shift: 2
        let leftKey14  = leftKey13.slice(2, 28)  + leftKey13[0]  + leftKey13[1]
        let rightKey14 = rightKey13.slice(2, 28) + rightKey13[0] + rightKey13[1]

        // Key round: 15, left shift: 2
        let leftKey15  = leftKey14.slice(2, 28)  + leftKey14[0]  + leftKey14[1]
        let rightKey15 = rightKey14.slice(2, 28) + rightKey14[0] + rightKey14[1]

        // Key round: 16, left shift: 1
        let leftKey16  = leftKey15.slice(1, 28)  + leftKey15[0]
        let rightKey16 = rightKey15.slice(1, 28) + rightKey15[0]

        // combine each key (left and right)
        const key1 = leftKey1 + rightKey1;      const  key9 =  leftKey9 +  rightKey9;
        const key2 = leftKey2 + rightKey2;      const key10 = leftKey10 + rightKey10;
        const key3 = leftKey3 + rightKey3;      const key11 = leftKey11 + rightKey11;
        const key4 = leftKey4 + rightKey4;      const key12 = leftKey12 + rightKey12;
        const key5 = leftKey5 + rightKey5;      const key13 = leftKey13 + rightKey13;
        const key6 = leftKey6 + rightKey6;      const key14 = leftKey14 + rightKey14;
        const key7 = leftKey7 + rightKey7;      const key15 = leftKey15 + rightKey15;
        const key8 = leftKey8 + rightKey8;      const key16 = leftKey16 + rightKey16;

        console.log(`Key after left shifted:`)
        console.log(`1. shift= ${key1}`)
        console.log(`2. shift= ${key2}`)
        console.log(`3. shift= ${key3}`)
        console.log(`4. shift= ${key4}`)
        console.log(`5. shift= ${key5}`)
        console.log(`6. shift= ${key6}`)
        console.log(`7. shift= ${key7}`)
        console.log(`8. shift= ${key8}`)
        console.log(`9. shift= ${key9}`)
        console.log(`10. shift= ${key10}`)
        console.log(`11. shift= ${key11}`)
        console.log(`12. shift= ${key12}`)
        console.log(`13. shift= ${key13}`)
        console.log(`14. shift= ${key14}`)
        console.log(`15. shift= ${key15}`)
        console.log(`16. shift= ${key16}`)
        
        // console.log(leftKey1)
        // console.log(rightKey1)
        // console.log("key1: " + key1)
        
        // console.log(Buffer.from(pc1Key, 'utf-8').toString() << 1) 
        // @end 6. Left shift key 16 times to generate 16 internal key================================================================================================================
        
        // 7. Enter 16 subkeys on PC2===================================================================
        let tempPC2List1  = []; let tempPC2List2  = []; let tempPC2List3  = []; let tempPC2List4  = [];
        let tempPC2List5  = []; let tempPC2List6  = []; let tempPC2List7  = []; let tempPC2List8  = [];
        let tempPC2List9  = []; let tempPC2List10 = []; let tempPC2List11 = []; let tempPC2List12 = [];
        let tempPC2List13 = []; let tempPC2List14 = []; let tempPC2List15 = []; let tempPC2List16 = [];

        // let tempPC2Key = []
        sKey = ""
        for (let i = 0; i < PC2.length; i++)
        {
            tempPC2List1.push(key1[PC2[i] - 1]);    tempPC2List9.push(key9[PC2[i] - 1]);
            tempPC2List2.push(key2[PC2[i] - 1]);    tempPC2List10.push(key10[PC2[i] - 1]);
            tempPC2List3.push(key3[PC2[i] - 1]);    tempPC2List11.push(key11[PC2[i] - 1]);
            tempPC2List4.push(key4[PC2[i] - 1]);    tempPC2List12.push(key12[PC2[i] - 1]);
            tempPC2List5.push(key5[PC2[i] - 1]);    tempPC2List13.push(key13[PC2[i] - 1]);
            tempPC2List6.push(key6[PC2[i] - 1]);    tempPC2List14.push(key14[PC2[i] - 1]);
            tempPC2List7.push(key7[PC2[i] - 1]);    tempPC2List15.push(key15[PC2[i] - 1]);
            tempPC2List8.push(key8[PC2[i] - 1]);    tempPC2List16.push(key16[PC2[i] - 1]);
        }

        console.log("16 sub keys for the encryption after permutated with PC2 table")

        const K1 = sKey.concat(tempPC2List1.join(""));  const K9  = sKey.concat(tempPC2List9.join(""));
        const K2 = sKey.concat(tempPC2List2.join(""));  const K10 = sKey.concat(tempPC2List10.join(""));
        const K3 = sKey.concat(tempPC2List3.join(""));  const K11 = sKey.concat(tempPC2List11.join(""));
        const K4 = sKey.concat(tempPC2List4.join(""));  const K12 = sKey.concat(tempPC2List12.join(""));
        const K5 = sKey.concat(tempPC2List5.join(""));  const K13 = sKey.concat(tempPC2List13.join(""));
        const K6 = sKey.concat(tempPC2List6.join(""));  const K14 = sKey.concat(tempPC2List14.join(""));
        const K7 = sKey.concat(tempPC2List7.join(""));  const K15 = sKey.concat(tempPC2List15.join(""));
        const K8 = sKey.concat(tempPC2List8.join(""));  const K16 = sKey.concat(tempPC2List16.join(""));

        const listOfKeys = [
            K1,  K2,  K3,  K4,  K5,  K6,  K7,  K8,
            K9, K10, K11, K12, K13, K14, K15, K16,
        ]

        console.log(`Key after permutated with PC2:`)
        console.log(`K1= ${K1}`)
        console.log(`K2= ${K2}`)
        console.log(`K3= ${K3}`)
        console.log(`K4= ${K4}`)
        console.log(`K5= ${K5}`)
        console.log(`K6= ${K6}`)
        console.log(`K7= ${K7}`)
        console.log(`K8= ${K8}`)
        console.log(`K8= ${K8}`)
        console.log(`K9= ${K9}`)
        console.log(`K10= ${K10}`)
        console.log(`K11= ${K11}`)
        console.log(`K12= ${K12}`)
        console.log(`K13= ${K13}`)
        console.log(`K14= ${K14}`)
        console.log(`K15= ${K15}`)
        console.log(`K16= ${K16}`)
        // @end 7. Enter 16 subkeys on PC2===================================================================

        // 8. Continuing Message processing from step 1================================================================================
        let leftMessageList = [L0]
        let rightMessageList = [R0]

        console.log(`leftMessageList: ${leftMessageList}`)
        console.log(`rightMessageList: ${rightMessageList}`)
        
        for (let i = 0; i < 16; i++) {
            console.log(`Encryption: round ${i + 1}`);
            leftMessageList.push(rightMessageList[i])
            console.log(`left message ${leftMessageList[i]}`)

            // temp of expansion table
            let tempEList = []
            let s = ''
            const R = rightMessageList[i]

            for (let m = 0; m < expansionTable.length; m++)
            {
                tempEList.push(R[expansionTable[m] - 1])
            }
            const ER = s.concat(tempEList.join(''))

            let tempF = []
            s = ''
            const subKey = listOfKeys[i]

            // XOR function
            for (let x = 0; x < 48; x++) 
            {
                if (subKey[x] == '0' && ER[x] == '0' || subKey[x] == '1' && ER[x] == '1')
                    tempF.push('0')
                else if (subKey[x] == '0' && ER[x] == '1' || subKey[x] == '1' && ER[x] == '0')
                    tempF.push('1')
            }

            const xorV = s.concat(tempF.join(''))

            let divideR = []
            let inc = 5       // resprenting 6 byte for sbox ops, we'll talk later
            const end = 48

            for (let start = 0; start < end; start++)
            {
                console.log(`start: ${start}`)
                let sChunk = ''
                let chunkBit = xorV.slice(start, inc + 1)
                console.log(`chunkBit: ${chunkBit}`)
                divideR.push(sChunk.concat(chunkBit))
                start = inc
                inc += 6
            }
            console.log(`divideR: ${divideR}`)

            // ops with S-Box
            let tempSboxesList = []
            for (let p = 0; p < divideR.length; p++) 
            {
                let item = divideR[p]
                let dict = sBoxes[p]
                tempSboxesList.push(dict[item])
            }
            Results_of_Sboxes = s.concat(tempSboxesList.join(''))
            console.log(`Results_of_Sboxes: ${Results_of_Sboxes}`)

            let counter = 0
            s = ''
            let tempFList = []

            for (counter; counter < pBoxes.length; counter++)
            {
                tempFList.push(Results_of_Sboxes[pBoxes[counter] - 1])
            }
            // after pBox ops
            const F = s.concat(tempFList.join(''))
            console.log(`F: ` + F)

            let tempNewR = []
            s = ''
            let PreviousL = leftMessageList[i]
            console.log(`previous L: ${PreviousL}`)
            for (let n = 0; n < 32; n++)
            {
                if (F[n] == '0' && PreviousL[n] == '0' || F[n] == '1' && PreviousL[n] == '1')
                    tempNewR.push('0')
                else if (F[n] == '0' && PreviousL[n] == '1' || F[n] == '1' && PreviousL[n] == '0')
                    tempNewR.push('1')
                console.log(`tempNewR[n]: ${tempNewR[n]}`)
            }
            console.log(`tempNewR: ${tempNewR}`)

            const NextR = s.concat(tempNewR.join(''))
            rightMessageList.push(NextR)
            console.log('yeay')
            console.log(NextR)

            // if reach the last of iteration (16th iteration of encyphering)
            if (i === 15)
            {
                let tempCipher = rightMessageList[i + 1] + leftMessageList[i + 1]
                console.log(`right message list: ${rightMessageList[i + 1]}`)
                console.log(`left message list: ${leftMessageList[i+1]}`)
                console.log(tempCipher)

                // get invertIP table
                let count = 0
                s = ''
                let tempCipherList = []

                // apply invert IP
                for (count; count < invertIP.length; count++)
                {
                    tempCipherList.push(tempCipher[invertIP[count] - 1])
                }
                let cipher = s.concat(tempCipherList.join(''))
                console.log(`Cipher text= ${cipher}`)

                let divideCipher = []
                let inc = 3
                for (let start = 0; start < 63; start++)
                {
                    divideCipher.push(cipher.slice(start, inc + 1))
                    start = inc
                    inc += 4
                }
                console.log(`divideCipher: ${divideCipher}`)

                // convert cipher to hex
                let cipher2HexList = []
                s = ''
                for (let c1 in divideCipher)
                {
                    for (let d1 in hexToBin)
                    {
                        if (divideCipher[c1] === hexToBin[d1])
                            cipher2HexList.push(d1)
                        console.log(`d1: ${d1}`)
                        console.log(`hexVal: ${hexToBin[d1]}`)
                    }
                    console.log(`test c1 Val: ${c1}`)
                    console.log(`test c1: ${c1}`)
                }
                // print result
                var cipherHex = s.concat(cipher2HexList.join(''))
                console.log(`cipherHex: ${cipherHex}`)
            }
        }
        // @end 8. Continuing Message processing from step 1================================================================================

        res.json({
            status: '200',
            'binary key': binaryKey,
            'encrypted message': cipherHex
        })
    }
}

const decryptMsgAPI = (req, res) => {
    const key = req.body.key.toLowerCase()
    const message = req.body.message.toLowerCase()

    if (key.length !== 8)
    {
        // alert('initial key must be 8 characters long!')
        res.json({
            status: 400,
            message: 'key must be 8 characters long!',
        }).end()
    }

    else if (message.length !== 16)
    {
        res.json({
            status: 400,
            message: 'encrypted message must be 16 characters long!',
        }).end()
    }

    else
    {
        // Key Ops first
        const hexKey = Buffer.from(key, 'utf-8').toString('hex')
        console.log(hexKey)

        let tempKey = []       // temporary key contain hexKey
        let sKey = ""          // container and joiner string for binary keys

        // loop and check to convert key from hex to bin
        for(let iKey = 0; iKey < hexKey.length; iKey++)
        {
            for(let key in hexToBin)
            {
                if (hexKey[iKey] === key) tempKey.push(hexToBin[key])
            }
            console.log('test')
            console.log(hexKey[iKey])
        }

        // concate binary keys to this string
        const binaryKey = sKey.concat(tempKey.join(''))
        console.log(binaryKey)

        // compress key from 64 bit to 56 bit with PC1 table (permutate)
        let tempPCKey = []
        sKey = ""
        for (let i = 0; i < PC1.length; i++)
        {
            tempPCKey.push(binaryKey[PC1[i] - 1])
        }

        const pc1Key = sKey.concat(tempPCKey.join(""))
        console.log(`Key after permutated with PC1: ${pc1Key}`)

        // shifting key 16 rounds to generate 16 different keys
        let leftKey0  = pc1Key.slice(0, 28)
        let rightKey0 = pc1Key.slice(28, 56) 

        // Key round: 1, left shift: 1
        let leftKey1  = leftKey0.slice(1, 28)  + leftKey0[0]  
        let rightKey1 = rightKey0.slice(1, 28) + rightKey0[0]  

        // Key round: 2, left shift: 1
        let leftKey2  = leftKey1.slice(1, 28)  + leftKey1[0]
        let rightKey2 = rightKey1.slice(1, 28) + rightKey1[0]
        // Key round: 3, left shift: 2
        let leftKey3  = leftKey2.slice(2, 28)  + leftKey2[0]  + leftKey2[1]
        let rightKey3 = rightKey2.slice(2, 28) + rightKey2[0] + rightKey2[1]

        // Key round: 4, left shift: 2
        let leftKey4  = leftKey3.slice(2, 28)  + leftKey3[0]  + leftKey3[1]
        let rightKey4 = rightKey3.slice(2, 28) + rightKey3[0] + rightKey3[1]

        // Key round: 5, left shift: 2
        let leftKey5  = leftKey4.slice(2, 28)  + leftKey4[0]  + leftKey4[1]
        let rightKey5 = rightKey4.slice(2, 28) + rightKey4[0] + rightKey4[1]

        // Key round: 6, left shift: 2
        let leftKey6  = leftKey5.slice(2, 28)  + leftKey5[0]  + leftKey5[1]
        let rightKey6 = rightKey5.slice(2, 28) + rightKey5[0] + rightKey5[1]

        // Key round: 7, left shift: 2
        let leftKey7  = leftKey6.slice(2, 28)  + leftKey6[0]  + leftKey6[1]
        let rightKey7 = rightKey6.slice(2, 28) + rightKey6[0] + rightKey6[1]

        // Key round: 8, left shift: 2
        let leftKey8  = leftKey7.slice(2, 28)  + leftKey7[0]  + leftKey7[1]
        let rightKey8 = rightKey7.slice(2, 28) + rightKey7[0] + rightKey7[1]

        // Key round: 9, left shift: 1
        let leftKey9  = leftKey8.slice(1, 28)  + leftKey8[0]
        let rightKey9 = rightKey8.slice(1, 28) + rightKey8[0]

        // Key round: 10, left shift: 2
        let leftKey10  = leftKey9.slice(2, 28)  + leftKey9[0]  + leftKey9[1]
        let rightKey10 = rightKey9.slice(2, 28) + rightKey9[0] + rightKey9[1]

        // Key round: 11, left shift: 2
        let leftKey11  = leftKey10.slice(2, 28)  + leftKey10[0]  + leftKey10[1]
        let rightKey11 = rightKey10.slice(2, 28) + rightKey10[0] + rightKey10[1]

        // Key round: 12, left shift: 2
        let leftKey12  = leftKey11.slice(2, 28)  + leftKey11[0]  + leftKey11[1]
        let rightKey12 = rightKey11.slice(2, 28) + rightKey11[0] + rightKey11[1]

        // Key round: 13, left shift: 2
        let leftKey13  = leftKey12.slice(2, 28)  + leftKey12[0]  + leftKey12[1]
        let rightKey13 = rightKey12.slice(2, 28) + rightKey12[0] + rightKey12[1]

        // Key round: 14, left shift: 2
        let leftKey14  = leftKey13.slice(2, 28)  + leftKey13[0]  + leftKey13[1]
        let rightKey14 = rightKey13.slice(2, 28) + rightKey13[0] + rightKey13[1]

        // Key round: 15, left shift: 2
        let leftKey15  = leftKey14.slice(2, 28)  + leftKey14[0]  + leftKey14[1]
        let rightKey15 = rightKey14.slice(2, 28) + rightKey14[0] + rightKey14[1]

        // Key round: 16, left shift: 1
        let leftKey16  = leftKey15.slice(1, 28)  + leftKey15[0]
        let rightKey16 = rightKey15.slice(1, 28) + rightKey15[0]

        // combine each key (left and right)
        const key1 = leftKey1 + rightKey1;      const  key9 =  leftKey9 +  rightKey9;
        const key2 = leftKey2 + rightKey2;      const key10 = leftKey10 + rightKey10;
        const key3 = leftKey3 + rightKey3;      const key11 = leftKey11 + rightKey11;
        const key4 = leftKey4 + rightKey4;      const key12 = leftKey12 + rightKey12;
        const key5 = leftKey5 + rightKey5;      const key13 = leftKey13 + rightKey13;
        const key6 = leftKey6 + rightKey6;      const key14 = leftKey14 + rightKey14;
        const key7 = leftKey7 + rightKey7;      const key15 = leftKey15 + rightKey15;
        const key8 = leftKey8 + rightKey8;      const key16 = leftKey16 + rightKey16;

        console.log(`Key after left shifted:`)
        console.log(`1. shift= ${key1}`)
        console.log(`2. shift= ${key2}`)
        console.log(`3. shift= ${key3}`)
        console.log(`4. shift= ${key4}`)
        console.log(`5. shift= ${key5}`)
        console.log(`6. shift= ${key6}`)
        console.log(`7. shift= ${key7}`)
        console.log(`8. shift= ${key8}`)
        console.log(`9. shift= ${key9}`)
        console.log(`10. shift= ${key10}`)
        console.log(`11. shift= ${key11}`)
        console.log(`12. shift= ${key12}`)
        console.log(`13. shift= ${key13}`)
        console.log(`14. shift= ${key14}`)
        console.log(`15. shift= ${key15}`)
        console.log(`16. shift= ${key16}`)


        // Ops 16 keys with PC2 table
        let tempPC2List1  = []; let tempPC2List2  = []; let tempPC2List3  = []; let tempPC2List4  = [];
        let tempPC2List5  = []; let tempPC2List6  = []; let tempPC2List7  = []; let tempPC2List8  = [];
        let tempPC2List9  = []; let tempPC2List10 = []; let tempPC2List11 = []; let tempPC2List12 = [];
        let tempPC2List13 = []; let tempPC2List14 = []; let tempPC2List15 = []; let tempPC2List16 = [];

        // let tempPC2Key = []
        sKey = ""
        for (let i = 0; i < PC2.length; i++)
        {
            tempPC2List1.push(key1[PC2[i] - 1]);    tempPC2List9.push(key9[PC2[i] - 1]);
            tempPC2List2.push(key2[PC2[i] - 1]);    tempPC2List10.push(key10[PC2[i] - 1]);
            tempPC2List3.push(key3[PC2[i] - 1]);    tempPC2List11.push(key11[PC2[i] - 1]);
            tempPC2List4.push(key4[PC2[i] - 1]);    tempPC2List12.push(key12[PC2[i] - 1]);
            tempPC2List5.push(key5[PC2[i] - 1]);    tempPC2List13.push(key13[PC2[i] - 1]);
            tempPC2List6.push(key6[PC2[i] - 1]);    tempPC2List14.push(key14[PC2[i] - 1]);
            tempPC2List7.push(key7[PC2[i] - 1]);    tempPC2List15.push(key15[PC2[i] - 1]);
            tempPC2List8.push(key8[PC2[i] - 1]);    tempPC2List16.push(key16[PC2[i] - 1]);
        }

        console.log("16 sub keys for the encryption after permutated with PC2 table")

        const K1 = sKey.concat(tempPC2List1.join(""));  const K9  = sKey.concat(tempPC2List9.join(""));
        const K2 = sKey.concat(tempPC2List2.join(""));  const K10 = sKey.concat(tempPC2List10.join(""));
        const K3 = sKey.concat(tempPC2List3.join(""));  const K11 = sKey.concat(tempPC2List11.join(""));
        const K4 = sKey.concat(tempPC2List4.join(""));  const K12 = sKey.concat(tempPC2List12.join(""));
        const K5 = sKey.concat(tempPC2List5.join(""));  const K13 = sKey.concat(tempPC2List13.join(""));
        const K6 = sKey.concat(tempPC2List6.join(""));  const K14 = sKey.concat(tempPC2List14.join(""));
        const K7 = sKey.concat(tempPC2List7.join(""));  const K15 = sKey.concat(tempPC2List15.join(""));
        const K8 = sKey.concat(tempPC2List8.join(""));  const K16 = sKey.concat(tempPC2List16.join(""));

        const listOfKeys = [
            K1,  K2,  K3,  K4,  K5,  K6,  K7,  K8,
            K9, K10, K11, K12, K13, K14, K15, K16,
        ]

        console.log(`Key after permutated with PC2:`)
        console.log(`K1= ${K1}`)
        console.log(`K2= ${K2}`)
        console.log(`K3= ${K3}`)
        console.log(`K4= ${K4}`)
        console.log(`K5= ${K5}`)
        console.log(`K6= ${K6}`)
        console.log(`K7= ${K7}`)
        console.log(`K8= ${K8}`)
        console.log(`K8= ${K8}`)
        console.log(`K9= ${K9}`)
        console.log(`K10= ${K10}`)
        console.log(`K11= ${K11}`)
        console.log(`K12= ${K12}`)
        console.log(`K13= ${K13}`)
        console.log(`K14= ${K14}`)
        console.log(`K15= ${K15}`)
        console.log(`K16= ${K16}`)


        /**
         * Message Processing Start (Decrypting Message)
         */

        // 1. convert plain text into binary=======================================================
        const hexMessage = Buffer.from(message, 'utf-8').toString('hex')
        let tempMessage = []    // temporary key contain hexMessage
        let sMessage = ""       // container and joiner string for binary message

        // loop and check to convert message from hex to bin
        for (let iMsg = 0; iMsg < hexMessage.length; iMsg++)
        {
            for (let msg in hexToBin)
            {
                if (hexMessage[iMsg] === msg) tempMessage.push(hexToBin[msg])
            }
            
        }
        console.log('HALO=======================================')
        console.log('test')
        console.log(`hexMessage: ${hexMessage}`)

        // concate binary message to this string
        const binaryMessage = sMessage.concat(tempMessage.join(''))
        console.log(`binaryMessage: ${binaryMessage}`)
        // @end 1. convert plain text into binary====================================================

        // 2. Permutate message with IP table========================================================
        let tempIPMsg = []
        let msgIP = ""
        for (let ipIndex = 0; ipIndex < initPermut.length; ipIndex++)
        {
            tempIPMsg.push(binaryMessage[initPermut[ipIndex] - 1])
            console.log(`tempIPMsg: ${tempIPMsg}`)
        }

        msgIP = msgIP.concat(tempIPMsg.join(''))
        console.log("tempIPmsg: " + msgIP)
        console.log(tempMessage)
        console.log(initPermut.length)
        // @end 2. Permutate message with IP table===================================================

        // 3. Divided permuted message into let and right side===========================================
        const R16 = msgIP.slice(0, 32)
        const L16 = msgIP.slice(32, 64)

        console.log(`L16: ${L16}`)
        console.log(`R16: ${R16}`)

        // reverse because decrypting
        let leftMessageList = [R16]
        let rightMessageList = [L16]
        
        // start iteration to decrypt
        for (let i = 0; i < 16; i++)
        {
            console.log(`Decryption: round ${i + 1}`)
            leftMessageList.push(rightMessageList[i])

            let tempERList = []
            let s = ""
            const R = rightMessageList[i]

            for (m = 0; m < expansionTable.length; m++)
            {
                tempERList.push(R[expansionTable[m] - 1])
            }

            // message after expanded
            let ER = s.concat(tempERList.join(''))
            console.log(`ER: ${ER}`)

            let tempF = []
            s = ""
            // reverse key index because decrypting
            const subKey = listOfKeys[15 - i]

            // XOR ops
            for (let x = 0; x < 48; x++)
            {
                if (subKey[x] == '0' && ER[x] == '0' || subKey[x] == '1' && ER[x] == '1')
                    tempF.push('0')
                else if (subKey[x] == '0' && ER[x] == '1' || subKey[x] == '1' && ER[x] == '0')
                    tempF.push('1')
            }
            // container XOR ops
            const xorV = s.concat(tempF.join(''))

            let divideR = []
            let inc = 5
            for (let start = 0; start < 48; start++)
            {
                divideR.push(xorV.slice(start, inc + 1))
                start = inc
                inc += 6
            }

            tempSboxesList = []
            for (let p = 0; p < divideR.length; p++)
            {
                let item = divideR[p]
                let dict = sBoxes[p]
                tempSboxesList.push(dict[item])
            }

            const Results_of_Sboxes = s.concat(tempSboxesList.join(''))

            s = ''
            tempFList = []
            for(let counter = 0; counter < pBoxes.length; counter++)
            {
                tempFList.push(Results_of_Sboxes[pBoxes[counter] - 1])
            }
            const F = s.concat(tempFList.join(''))


            let tempNewR = []
            s = ''
            let PreviousR = leftMessageList[i]

            for (let n = 0; n < 32; n++)
            {
                if (F[n] == '0' && PreviousR[n] == '0' || F[n] == '1' && PreviousR[n] == '1')
                    tempNewR.push('0')
                else if (F[n] == '0' && PreviousR[n] == '1' || F[n] == '1' && PreviousR[n] == '0')
                    tempNewR.push('1')
            }
            const NextL = s.concat(tempNewR.join(''))
            rightMessageList.push(NextL)
            console.log(`NextL: ${NextL}`)

            // If last iteration (16th)
            if (i === 15)
            {
                const tempPlain = rightMessageList[i + 1] + leftMessageList[i + 1]

                let count = 0
                s = ''
                let tempPlainList = []
                for (count; count < invertIP.length; count++)
                {
                    tempPlainList.push(tempPlain[invertIP[count] - 1])
                }
                const plain = s.concat(tempPlainList.join(''))
                console.log(`plain text: ${plain}`)


                let dividePlaintxt = []
                let start = 0
                let inc = 3
                const end = 64
                for (start; start < end; start++)
                {
                    dividePlaintxt.push(plain.slice(start, inc + 1))
                    start = inc
                    inc += 4
                }
                console.log(`dividePlaintxt: ${dividePlaintxt}`)

                // converting hex to binary
                let plainHexList = []
                s = ''
                for (let c1 in dividePlaintxt)
                {
                    for (let d1 in hexToBin)
                    {
                        // console.log()
                        if (dividePlaintxt[c1] === hexToBin[d1])
                            plainHexList.push(d1)
                    }
                }
                const plainHex = s.concat(plainHexList.join(''))
                console.log(`plainHex: ${plainHex}`)

                let dividePlainHex = []
                start = 0
                inc = 1
                for (start; start < 16; start++)
                {
                    dividePlainHex.push(plainHex.slice(start, inc + 1))
                    start = inc
                    inc += 2
                }
                console.log(`dividePlainHex: ${dividePlainHex}`)

                // convert to characters
                let plainCharList = []
                s = ''
                for (h1 in dividePlainHex)
                {
                    console.log(`h1 Val: ${dividePlainHex[h1]}`)
                    for (c1 in hexToChar)
                    {
                        // console.log(`c1: ${c1}`)
                        // console.log(`c1 val: ${hexToChar[c1]}`)
                        if (dividePlainHex[h1] === hexToChar[c1])
                            plainCharList.push(c1)
                    }
                }
                var finalPlainText = s.concat(plainCharList.join(''))
                console.log(`finalPlainText: ${plainCharList}`)
            }
        }

        res.json({
            status: '200',
            'binary key': binaryKey,
            'decrypted message': finalPlainText
        })
    }
}



// const encryptMsg = (req, res) => {
//     const initialKey = req.body.initialKey.toLoweCase()
//     const message = req.body.message.toLowerCase()

//     if (initialKey.length > 8 || initialKey.length < 8) {
//         alert('initial key must be 8 characters long!')
//     } else {
//         hexKey = Buffer.from(initialKey, 'utf-8').toString('hex')
//         console.log(hexKey)
//     }
// }

// const indexView = (req, res) => {
//     res.send('Hello Cruel World!')
// }

// const ejsRender = (req, res) => {
//     res.render('index')
// }



    

module.exports = { 
    // indexView,
    // ejsRender,
    encryptMsgAPI,
    decryptMsgAPI,
}