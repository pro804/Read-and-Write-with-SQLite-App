import { useState } from "react";
import { View,Text,TextInput,Button,StyleSheet,Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite"; 


/**
 * Component for adding a new user to the database
 * @param {function} onSuccess - callback function to call when the user is added successfully
 */
const UserForm =({ onSuccess })=>{
    const [form,setForm]=useState({
        firstName: '',
        lastName: '',
        email: '',
        phone:'' 
    });

    const db = useSQLiteContext();

    /**
     * Handle form submission
     * Validate form data, insert into database, and call onSuccess callback
     */
    const handleSubmit = async ()=> {
        try{
            // validate form data
            if (!form.firstName|| !form.lastName || !form.email || !form.phone){
                throw new Error('All fields are required');
            }
            
            // insert into database
            await db.runAsync(
                'INSERT INTO users (firstName, lastName, email, phone) VALUES(?, ?, ?, ?)',
                [form.firstName, form.lastName, form.email, form.phone]
            );
            onSuccess(); 
            Alert.alert('Success', 'User added succesfully!');
            
            // reset form
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            });
    } catch (error) {
        // handle SQLite errors specifically
        if (error.message.includes('UNIQUE')){
           Alert.alert('Error', 'Email already exists!');
        } else {
            Alert.alert('Error', error.message || 'Database operation failed');
        }
    }
    
};

return (
    
    <View style={styles.container}>

        <TextInput
        style={styles.input}
        placeholder="First Name"
        value={form.firstName}
        onChangeText={(text)=>setForm({...form, firstName:text})}
        />

        <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={form.lastName}
        onChangeText={(text)=>setForm({...form, lastName:text})}
        />

        <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text)=>setForm({...form, email:text})}
        /> 

        <TextInput
        style={styles.input}
        placeholder="Phone"
        value={form.phone}
        onChangeText={(text)=>setForm({...form, phone:text})}
        />
        <Button title="Add User" onPress={handleSubmit} />    
    </View>
    
);
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        marginTop: 50,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,    
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    }
});

export default UserForm;

