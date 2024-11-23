import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { Invoice } from '../types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#6B46C1',
    textAlign: 'center',
  },
  header: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 100,
    color: '#4A5568',
  },
  value: {
    flex: 1,
  },
  billingSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F7FAFC',
    borderRadius: 4,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#6B46C1',
    marginBottom: 10,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#6B46C1',
    color: '#FFFFFF',
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    padding: 8,
  },
  col1: { width: '40%' },
  col2: { width: '20%' },
  col3: { width: '20%' },
  col4: { width: '20%' },
  total: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#4A5568',
    fontSize: 10,
  },
});

interface InvoicePDFProps {
  invoice: Invoice;
  companyName: string;
  footerText: string;
}

export const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice, companyName, footerText }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{companyName}</Text>

      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={styles.label}>Invoice No #</Text>
          <Text style={styles.value}>{invoice.number}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Invoice Date</Text>
          <Text style={styles.value}>{format(invoice.date, 'MMM dd, yyyy')}</Text>
        </View>
        {invoice.dueDate && (
          <View style={styles.row}>
            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.value}>{format(invoice.dueDate, 'MMM dd, yyyy')}</Text>
          </View>
        )}
      </View>

      <View style={styles.billingSection}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Billed By</Text>
            <Text>{invoice.billedBy.name}</Text>
            <Text>{invoice.billedBy.address}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Billed To</Text>
            {invoice.billedTo && (
              <>
                <Text>{invoice.billedTo.name}</Text>
                <Text>{invoice.billedTo.business.address}</Text>
              </>
            )}
          </View>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.col1}>Item</Text>
          <Text style={styles.col2}>Quantity</Text>
          <Text style={styles.col3}>Rate</Text>
          <Text style={styles.col4}>Amount</Text>
        </View>
        {invoice.items.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.col1}>{item.name}</Text>
            <Text style={styles.col2}>{item.quantity}</Text>
            <Text style={styles.col3}>{invoice.currency} {item.rate}</Text>
            <Text style={styles.col4}>{invoice.currency} {item.amount}</Text>
          </View>
        ))}
      </View>

      <View style={styles.total}>
        <View style={styles.row}>
          <Text style={[styles.label, { textAlign: 'right', paddingRight: 10 }]}>Total ({invoice.currency})</Text>
          <Text style={[styles.value, { textAlign: 'right' }]}>{invoice.currency} {invoice.total}</Text>
        </View>
      </View>

      <Text style={styles.footer}>{footerText}</Text>
    </Page>
  </Document>
);