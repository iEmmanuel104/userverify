// Define user type
export type User = {
    nin: string
    bvn: string
    firstName: string
    lastName: string
    middleName: string
    gender: string
    image: string
}

// Mock database - in a real app, this would be a database connection
const users: User[] = [
    {
        nin: "12345678901",
        bvn: "10987654321",
        firstName: "John",
        lastName: "Doe",
        middleName: "Michael",
        gender: "Male",
        image: "/placeholder.svg?height=200&width=200",
    },
    {
        nin: "98765432109",
        bvn: "90123456789",
        firstName: "Jane",
        lastName: "Smith",
        middleName: "Elizabeth",
        gender: "Female",
        image: "/placeholder.svg?height=200&width=200",
    },
    {
        nin: "11122233344",
        bvn: "44433322211",
        firstName: "David",
        lastName: "Johnson",
        middleName: "Robert",
        gender: "Male",
        image: "/placeholder.svg?height=200&width=200",
    },
]

// Function to get user by NIN
export function getUserByNIN(nin: string): User | undefined {
    return users.find((user) => user.nin === nin)
}

// Function to verify BVN matches NIN
export function verifyBVN(nin: string, bvn: string): boolean {
    const user = getUserByNIN(nin)
    return user ? user.bvn === bvn : false
}

