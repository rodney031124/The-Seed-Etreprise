import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  onSnapshot,
  writeBatch,
  arrayUnion,
  arrayRemove,
  increment
} from 'firebase/firestore';
import { db } from './firebase';

// ==================== COLLECTION REFERENCES ====================
export const usersCollection = collection(db, 'users');
export const clientsCollection = collection(db, 'clients');
export const documentsCollection = collection(db, 'documents');
export const invoicesCollection = collection(db, 'invoices');
export const projectsCollection = collection(db, 'projects');
export const tasksCollection = collection(db, 'tasks');
export const messagesCollection = collection(db, 'messages');
export const notificationsCollection = collection(db, 'notifications');
export const settingsCollection = collection(db, 'settings');
export const activityLogsCollection = collection(db, 'activityLogs');

// ==================== GENERIC CRUD OPERATIONS ====================

/**
 * Create a new document in a collection
 * @param {string} collectionName - Name of the collection
 * @param {Object} data - Data to add
 * @returns {Promise} - Promise with the document reference
 */
export const createDocument = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Get all documents from a collection
 * @param {string} collectionName - Name of the collection
 * @returns {Promise} - Promise with array of documents
 */
export const getAllDocuments = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Get a single document by ID
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @returns {Promise} - Promise with the document data
 */
export const getDocumentById = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Document not found');
    }
  } catch (error) {
    console.error(`Error getting document ${docId} from ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Update a document
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @param {Object} data - Data to update
 * @returns {Promise} - Promise with update result
 */
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { id: docId, ...data };
  } catch (error) {
    console.error(`Error updating document ${docId} in ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Delete a document
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @returns {Promise} - Promise with delete result
 */
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return { id: docId, deleted: true };
  } catch (error) {
    console.error(`Error deleting document ${docId} from ${collectionName}:`, error);
    throw error;
  }
};

// ==================== QUERY OPERATIONS ====================

/**
 * Query documents with filters
 * @param {string} collectionName - Name of the collection
 * @param {Array} conditions - Array of where conditions [[field, operator, value], ...]
 * @param {Object} options - Query options { orderBy, orderDir, limit: number }
 * @returns {Promise} - Promise with filtered documents
 */
export const queryDocuments = async (collectionName, conditions = [], options = {}) => {
  try {
    let q = collection(db, collectionName);
    
    // Add where conditions
    conditions.forEach(condition => {
      q = query(q, where(condition[0], condition[1], condition[2]));
    });
    
    // Add orderBy
    if (options.orderBy) {
      q = query(q, orderBy(options.orderBy, options.orderDir || 'asc'));
    }
    
    // Add limit
    if (options.limit) {
      q = query(q, limit(options.limit));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error querying ${collectionName}:`, error);
    throw error;
  }
};

// ==================== REAL-TIME SUBSCRIPTIONS ====================

/**
 * Subscribe to real-time updates from a collection
 * @param {string} collectionName - Name of the collection
 * @param {Function} callback - Callback function to handle updates
 * @param {Array} conditions - Optional where conditions
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToCollection = (collectionName, callback, conditions = []) => {
  try {
    let q = collection(db, collectionName);
    
    conditions.forEach(condition => {
      q = query(q, where(condition[0], condition[1], condition[2]));
    });
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(documents);
    }, (error) => {
      console.error(`Error in subscription to ${collectionName}:`, error);
      callback([]);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error(`Error setting up subscription to ${collectionName}:`, error);
    return () => {};
  }
};

/**
 * Subscribe to a single document
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @param {Function} callback - Callback function to handle updates
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToDocument = (collectionName, docId, callback) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback({ id: docSnap.id, ...docSnap.data() });
      } else {
        callback(null);
      }
    }, (error) => {
      console.error(`Error in subscription to ${collectionName}/${docId}:`, error);
      callback(null);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error(`Error setting up subscription to ${collectionName}/${docId}:`, error);
    return () => {};
  }
};

// ==================== BATCH OPERATIONS ====================

/**
 * Perform multiple write operations in a batch
 * @param {Array} operations - Array of operations [{ type: 'set'/'update'/'delete', collection, docId, data }]
 * @returns {Promise} - Promise with batch result
 */
export const performBatchWrite = async (operations) => {
  try {
    const batch = writeBatch(db);
    
    operations.forEach(op => {
      const docRef = doc(db, op.collection, op.docId);
      
      switch (op.type) {
        case 'set':
          batch.set(docRef, { ...op.data, updatedAt: serverTimestamp() });
          break;
        case 'update':
          batch.update(docRef, { ...op.data, updatedAt: serverTimestamp() });
          break;
        case 'delete':
          batch.delete(docRef);
          break;
        default:
          throw new Error(`Invalid operation type: ${op.type}`);
      }
    });
    
    await batch.commit();
    return { success: true, operations: operations.length };
  } catch (error) {
    console.error('Error performing batch write:', error);
    throw error;
  }
};

// ==================== USER-SPECIFIC OPERATIONS ====================

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Promise} - Promise with user data
 */
export const getUserByEmail = async (email) => {
  try {
    const q = query(usersCollection, where('email', '==', email));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
};

/**
 * Get users by role
 * @param {string} role - User role
 * @returns {Promise} - Promise with array of users
 */
export const getUsersByRole = async (role) => {
  try {
    const q = query(usersCollection, where('role', '==', role));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting users by role ${role}:`, error);
    throw error;
  }
};

// ==================== CLIENT-SPECIFIC OPERATIONS ====================

/**
 * Get clients for a specific user
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with array of clients
 */
export const getUserClients = async (userId) => {
  try {
    const q = query(clientsCollection, where('assignedTo', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting clients for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Search clients by name or email
 * @param {string} searchTerm - Search term
 * @returns {Promise} - Promise with array of matching clients
 */
export const searchClients = async (searchTerm) => {
  try {
    // Note: Firestore doesn't support full-text search out of the box
    // This is a simple implementation that searches for exact matches
    // Consider using Algolia or MeiliSearch for better search functionality
    const snapshot = await getDocs(clientsCollection);
    const clients = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return clients.filter(client => 
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching clients:', error);
    throw error;
  }
};

// ==================== DOCUMENT-SPECIFIC OPERATIONS ====================

/**
 * Get documents for a client
 * @param {string} clientId - Client ID
 * @returns {Promise} - Promise with array of documents
 */
export const getClientDocuments = async (clientId) => {
  try {
    const q = query(documentsCollection, where('clientId', '==', clientId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting documents for client ${clientId}:`, error);
    throw error;
  }
};

// ==================== INVOICE-SPECIFIC OPERATIONS ====================

/**
 * Get invoices for a client
 * @param {string} clientId - Client ID
 * @returns {Promise} - Promise with array of invoices
 */
export const getClientInvoices = async (clientId) => {
  try {
    const q = query(invoicesCollection, where('clientId', '==', clientId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting invoices for client ${clientId}:`, error);
    throw error;
  }
};

/**
 * Get invoices by status
 * @param {string} status - Invoice status (paid, pending, overdue)
 * @returns {Promise} - Promise with array of invoices
 */
export const getInvoicesByStatus = async (status) => {
  try {
    const q = query(invoicesCollection, where('status', '==', status));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting invoices by status ${status}:`, error);
    throw error;
  }
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Convert a JavaScript Date to Firestore Timestamp
 * @param {Date} date - JavaScript Date object
 * @returns {Timestamp} - Firestore Timestamp
 */
export const toFirestoreTimestamp = (date) => {
  return Timestamp.fromDate(date);
};

/**
 * Convert Firestore Timestamp to JavaScript Date
 * @param {Timestamp} timestamp - Firestore Timestamp
 * @returns {Date} - JavaScript Date object
 */
export const fromFirestoreTimestamp = (timestamp) => {
  return timestamp?.toDate();
};

/**
 * Get server timestamp
 * @returns {FieldValue} - Server timestamp
 */
export const getServerTimestamp = () => serverTimestamp();

// ==================== CONTACT SUBMISSIONS ====================

// Create a reference for contact submissions collection
export const contactSubmissionsCollection = collection(db, 'contactSubmissions');

/**
 * Save a contact form submission
 * @param {Object} submissionData - The contact form data
 * @param {string} submissionData.name - Sender's name
 * @param {string} submissionData.email - Sender's email
 * @param {string} submissionData.subject - Message subject
 * @param {string} submissionData.message - Message content
 * @param {string} submissionData.phone - Optional phone number
 * @returns {Promise} - Promise with the saved submission
 */
export const saveContactSubmission = async (submissionData) => {
  try {
    const docRef = await addDoc(contactSubmissionsCollection, {
      ...submissionData,
      status: 'unread', // unread, read, replied
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { 
      id: docRef.id, 
      ...submissionData, 
      status: 'unread' 
    };
  } catch (error) {
    console.error('Error saving contact submission:', error);
    throw error;
  }
};

/**
 * Get all contact submissions
 * @param {Object} options - Query options
 * @param {string} options.status - Filter by status (unread, read, replied)
 * @param {string} options.orderBy - Field to order by (default: 'createdAt')
 * @param {string} options.orderDir - Order direction (asc or desc, default: 'desc')
 * @returns {Promise} - Promise with array of submissions
 */
export const getAllContactSubmissions = async (options = {}) => {
  try {
    let q = query(
      contactSubmissionsCollection,
      orderBy(options.orderBy || 'createdAt', options.orderDir || 'desc')
    );
    
    if (options.status) {
      q = query(q, where('status', '==', options.status));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert timestamps to JavaScript dates for easier handling
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    }));
  } catch (error) {
    console.error('Error getting contact submissions:', error);
    throw error;
  }
};

/**
 * Update contact submission status
 * @param {string} submissionId - Submission ID
 * @param {string} status - New status (unread, read, replied)
 * @returns {Promise} - Promise with updated submission
 */
export const updateContactSubmissionStatus = async (submissionId, status) => {
  try {
    const docRef = doc(db, 'contactSubmissions', submissionId);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return { id: submissionId, status };
  } catch (error) {
    console.error('Error updating contact submission status:', error);
    throw error;
  }
};

/**
 * Delete a contact submission
 * @param {string} submissionId - Submission ID
 * @returns {Promise} - Promise with delete result
 */
export const deleteContactSubmission = async (submissionId) => {
  try {
    const docRef = doc(db, 'contactSubmissions', submissionId);
    await deleteDoc(docRef);
    return { id: submissionId, deleted: true };
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    throw error;
  }
};

/**
 * Subscribe to contact submissions (real-time updates)
 * @param {Function} callback - Callback function to handle updates
 * @param {Object} options - Query options
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToContactSubmissions = (callback, options = {}) => {
  try {
    let q = query(
      contactSubmissionsCollection,
      orderBy(options.orderBy || 'createdAt', options.orderDir || 'desc')
    );
    
    if (options.status) {
      q = query(q, where('status', '==', options.status));
    }
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const submissions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      }));
      callback(submissions);
    }, (error) => {
      console.error('Error in contact submissions subscription:', error);
      callback([]);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up contact submissions subscription:', error);
    return () => {};
  }
};

// ==================== SERVICE REQUESTS ====================

// Create a reference for service requests collection
export const serviceRequestsCollection = collection(db, 'serviceRequests');

/**
 * Create a new service request
 * @param {Object} requestData - Service request data
 * @returns {Promise} - Promise with the created request
 */
export const createServiceRequest = async (requestData) => {
  try {
    const docRef = await addDoc(serviceRequestsCollection, {
      ...requestData,
      status: 'pending', // pending, in-progress, completed, cancelled
      priority: requestData.priority || 'medium', // low, medium, high, urgent
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { 
      id: docRef.id, 
      ...requestData, 
      status: 'pending',
      priority: requestData.priority || 'medium'
    };
  } catch (error) {
    console.error('Error creating service request:', error);
    throw error;
  }
};

/**
 * Get all service requests
 * @param {Object} options - Query options
 * @returns {Promise} - Promise with array of service requests
 */
export const getAllServiceRequests = async (options = {}) => {
  try {
    let q = query(
      serviceRequestsCollection,
      orderBy(options.orderBy || 'createdAt', options.orderDir || 'desc')
    );
    
    if (options.status) {
      q = query(q, where('status', '==', options.status));
    }
    
    if (options.priority) {
      q = query(q, where('priority', '==', options.priority));
    }
    
    if (options.clientId) {
      q = query(q, where('clientId', '==', options.clientId));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    }));
  } catch (error) {
    console.error('Error getting service requests:', error);
    throw error;
  }
};

/**
 * Update service request status
 * @param {string} requestId - Service request ID
 * @param {string} status - New status
 * @param {Object} additionalData - Any additional data to update
 * @returns {Promise} - Promise with updated request
 */
export const updateServiceRequestStatus = async (requestId, status, additionalData = {}) => {
  try {
    const docRef = doc(db, 'serviceRequests', requestId);
    await updateDoc(docRef, {
      status,
      ...additionalData,
      updatedAt: serverTimestamp()
    });
    return { id: requestId, status, ...additionalData };
  } catch (error) {
    console.error('Error updating service request status:', error);
    throw error;
  }
};

/**
 * Delete a service request
 * @param {string} requestId - Service request ID
 * @returns {Promise} - Promise with delete result
 */
export const deleteServiceRequest = async (requestId) => {
  try {
    const docRef = doc(db, 'serviceRequests', requestId);
    await deleteDoc(docRef);
    return { id: requestId, deleted: true };
  } catch (error) {
    console.error('Error deleting service request:', error);
    throw error;
  }
};

/**
 * Subscribe to service requests (real-time updates)
 * @param {Function} callback - Callback function
 * @param {Object} options - Query options
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToServiceRequests = (callback, options = {}) => {
  try {
    let q = query(
      serviceRequestsCollection,
      orderBy(options.orderBy || 'createdAt', options.orderDir || 'desc')
    );
    
    if (options.status) {
      q = query(q, where('status', '==', options.status));
    }
    
    if (options.priority) {
      q = query(q, where('priority', '==', options.priority));
    }
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      }));
      callback(requests);
    }, (error) => {
      console.error('Error in service requests subscription:', error);
      callback([]);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up service requests subscription:', error);
    return () => {};
  }
};

// Instead of: export default { ... }

// Create the object first
const firestoreService = {
  // Collection references
  usersCollection,
  clientsCollection,
  documentsCollection,
  invoicesCollection,
  projectsCollection,
  tasksCollection,
  messagesCollection,
  notificationsCollection,
  settingsCollection,
  activityLogsCollection,
  contactSubmissionsCollection,
  serviceRequestsCollection,
  
  // CRUD operations
  createDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  
  // Query operations
  queryDocuments,
  
  // Real-time subscriptions
  subscribeToCollection,
  subscribeToDocument,
  
  // Batch operations
  performBatchWrite,
  
  // User-specific
  getUserByEmail,
  getUsersByRole,
  
  // Client-specific
  getUserClients,
  searchClients,
  
  // Document-specific
  getClientDocuments,
  
  // Invoice-specific
  getClientInvoices,
  getInvoicesByStatus,
  
  // Contact submissions
  saveContactSubmission,
  getAllContactSubmissions,
  updateContactSubmissionStatus,
  deleteContactSubmission,
  subscribeToContactSubmissions,
  
  // Service requests
  createServiceRequest,
  getAllServiceRequests,
  updateServiceRequestStatus,
  deleteServiceRequest,
  subscribeToServiceRequests,
  
  // Utilities
  toFirestoreTimestamp,
  fromFirestoreTimestamp,
  getServerTimestamp,
  arrayUnion,
  arrayRemove,
  increment
};

// Then export it
export default firestoreService;