'use client';
import { useEffect } from 'react';
export default function Title({ t }) { useEffect(() => { document.title = `BookNook | ${t}`; }, [t]); return null; }
