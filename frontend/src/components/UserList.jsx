import { useState } from "react";
import { Card, Button, Modal, Form, Table, Badge } from "react-bootstrap";

import {
  Plus,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";

const UserList = () => {
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);

  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@email.com",
      role: "customer",
      status: "active",
      lastLogin: new Date().toISOString(),
    },
  ]);

  const handleToggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-white border-bottom flex items-center justify-between">
        <div>
          <h5 className="font-semibold">User Management</h5>
          <p className="text-gray-600 text-sm">
            Manage user accounts and permissions
          </p>
        </div>

        <Button
          variant="primary"
          className="flex items-center gap-2"
          onClick={() => setNewUserDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </Card.Header>

      <Card.Body>
        <Table striped hover responsive className="align-middle">
          <thead className="bg-gray-50">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>

                <td>
                  <Badge bg={user.role === "admin" ? "primary" : "secondary"}>
                    {user.role}
                  </Badge>
                </td>

                <td>
                  <Badge bg={user.status === "active" ? "success" : "secondary"}>
                    {user.status}
                  </Badge>
                </td>

                <td>{new Date(user.lastLogin).toLocaleDateString()}</td>

                <td>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => handleToggleUserStatus(user.id)}
                    >
                      {user.status === "active" ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>

      {/* Modal for adding user */}
      <Modal
        show={newUserDialogOpen}
        onHide={() => setNewUserDialogOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control placeholder="John" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Doe" />
              </Form.Group>
            </div>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="user@email.com" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control placeholder="(555) 123-4567" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Select defaultValue="customer">
                <option value="customer">Customer</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              alert("User created!");
              setNewUserDialogOpen(false);
            }}
          >
            Create User
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default UserList;
