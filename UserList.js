import { useEffect, useState, useRef } from "react";
import { SectionList, Text, View, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput, Alert } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// UserList component definition
const UserList = ({ needsRefresh }) => {
    // State variables for user list, loading status, editing status, and edited user data
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);

    // SQLite database context
    const db = useSQLiteContext();

    // Ref to track component's mounted status
    const isMounted = useRef(true);

    // Effect to load users when component mounts or needsRefresh changes
    useEffect(() => {
        if (!isMounted.current) return;
        loadUsers();
        return () => {
            isMounted.current = false;
        };
    }, [needsRefresh]);

    // Loading indicator while fetching data
    if (isLoading) {
        return <ActivityIndicator size={"large"} color={"#0000ff"} />;
    }

    // Load users from the database
    const loadUsers = async () => {
        try {
            setIsLoading(true);
            const results = await db.getAllAsync(`SELECT * FROM users ORDER BY id DESC`, []);
            if (isMounted) setUsers(results);
        } catch (error) {
            console.error('Database error:', error);
        } finally {
            if (isMounted) setIsLoading(false);
        }
    };

    // Handle the deletion of a user
    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            await db.runAsync(`DELETE FROM users WHERE id = ?`, [id]);
            Alert.alert('Success', 'User successfully deleted from database');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            loadUsers();
        }
    };

    // Handle the initiation of editing a user
    const handleEdit = async (id, user) => {
        setIsEditing(true);
        setEditedUser(user);
    };

    // Handle submission of edited user data
    const handleSubmit = async () => {
        try {
            await db.runAsync(
                `UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ? WHERE id = ?`,
                [editedUser.firstName, editedUser.lastName, editedUser.email, editedUser.phone, editedUser.id]
            );
            Alert.alert('Success', 'User successfully updated!');
            loadUsers();
        } catch (error) {
            console.error(error);
        } finally {
            setIsEditing(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <SectionList
                    sections={[{ title: 'Users', data: users }]}
                    renderItem={({ item }) => {
                        if (isEditing && editedUser && editedUser.id === item.id) {
                            // Render editable form for user
                            return (
                                <TouchableOpacity onPress={() => handleSubmit()} style={styles.editCardContainer}>
                                    <View style={styles.card}>
                                        <TextInput
                                            value={editedUser.firstName}
                                            onChangeText={(text) => setEditedUser({ ...editedUser, firstName: text })}
                                            placeholder="First Name"
                                            style={styles.cardTextInput}
                                        />
                                        <TextInput
                                            value={editedUser.lastName}
                                            onChangeText={(text) => setEditedUser({ ...editedUser, lastName: text })}
                                            placeholder="Last Name"
                                            style={styles.cardTextInput}
                                        />
                                        <TextInput
                                            value={editedUser.email}
                                            onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
                                            placeholder="Email"
                                            style={styles.cardTextInput}
                                        />
                                        <TextInput
                                            value={editedUser.phone}
                                            onChangeText={(text) => setEditedUser({ ...editedUser, phone: text })}
                                            placeholder="Phone"
                                            style={styles.cardTextInput}
                                        />
                                        <MaterialCommunityIcons name="check-circle" size={24} color="green" />
                                    </View>
                                </TouchableOpacity>
                            );
                        } else {
                            // Render user details with edit and delete options
                            return (
                                <TouchableOpacity onPress={() => handleEdit(item.id, item)} style={styles.cardContainer}>
                                    <View style={styles.card}>
                                        <Text style={styles.cardTitle}>{item.firstName} {item.lastName}</Text>
                                        <Text style={styles.cardText}>{item.email}</Text>
                                        <Text style={styles.cardText}>{item.phone}</Text>
                                        <View style={styles.iconContainer}>
                                            <MaterialCommunityIcons name="pencil" size={24} color="black" />
                                            <MaterialCommunityIcons name="delete" size={24} color="red" onPress={() => handleDelete(item.id)} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                    }}
                    renderSectionHeader={({ section }) => (
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", padding: 8, backgroundColor: "#fff" }}>
                {/* Input fields for adding a new user */}
                <TextInput
                    placeholder="First Name"
                    style={styles.addCardTextInput}
                />
                <TextInput
                    placeholder="Last Name"
                    style={styles.addCardTextInput}
                />
                <TextInput
                    placeholder="Email"
                    style={styles.addCardTextInput}
                />
                <TextInput
                    placeholder="Phone"
                    style={styles.addCardTextInput}
                />
            </View>
        </View>
    );
};

// Styles for the UserList component
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    editCardContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    card: {
        width: "100%",
        borderRadius: 10,
        marginBottom: 8,
        padding: 8,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        color: "#333",
        fontWeight: "bold",
        marginBottom: 4,
    },
    cardText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 4,
    },
    cardTextInput: {
        flex: 1,
        padding: 8,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 4,
    },
    addCardTextInput: {
        flex: 1,
        padding: 8,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 4,
        height: 40,
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 4,
    },
    sectionHeader: {
        backgroundColor: "#f0f0f0",
        padding: 8,
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default UserList;

