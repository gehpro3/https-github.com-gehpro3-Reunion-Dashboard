// File: app/test/page.tsx

'use client'; // The most important line

export default function TestPage() {
  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Test Page</h1>
      <p>If you can see this page, the routing is working.</p>
      <button
        onClick={() => alert('The button is working!')}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
        }}
      >
        Click Me
      </button>
    </div>
  );
}
