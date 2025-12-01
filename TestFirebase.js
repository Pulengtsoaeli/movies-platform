// src/components/TestFirebase.js
import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';

const TestFirebase = () => {
  const [status, setStatus] = useState('Testing connection...');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const testFirebase = async () => {
      try {
        // Test 1: Write to Firestore
        setStatus('Writing test data...');
        const testDocRef = await addDoc(collection(db, 'testConnection'), {
          message: 'Firebase connection test',
          timestamp: new Date(),
          status: 'success'
        });
        
        // Test 2: Read from Firestore
        setStatus('Reading test data...');
        const querySnapshot = await getDocs(collection(db, 'testConnection'));
        const documents = [];
        querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });
        
        setStatus(`✅ Firebase Connected Successfully! Found ${documents.length} test documents`);
        setIsConnected(true);
        
        console.log('Firestore test documents:', documents);
        
      } catch (error) {
        setStatus(`❌ Firebase Connection Failed: ${error.message}`);
        setIsConnected(false);
        console.error('Firebase connection error:', error);
      }
    };

    testFirebase();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: `2px solid ${isConnected ? 'green' : 'red'}`,
      backgroundColor: isConnected ? '#f0fff0' : '#fff0f0'
    }}>
      <h3>Firebase Connection Test</h3>
      <p>{status}</p>
      {isConnected && (
        <button 
          onClick={() => window.location.reload()}
          style={{ marginTop: '10px', padding: '5px 10px' }}
        >
          Test Again
        </button>
      )}
    </div>
  );
};

export default TestFirebase;