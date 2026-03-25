import React, { useState } from 'react';
import { Negotiate } from '../utils/api';

interface SalaryFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (data: any) => void;
}

const SalaryForm: React.FC<SalaryFormProps> = ({ onSubmit }) => {
    const [role, setRole] = useState('');
    const [city, setCity] = useState('');
    const [experience, setExperience] = useState<number | ''>('');
    const [currentOffer, setCurrentOffer] = useState<number | ''>('');
    const [companySize, setCompanySize] = useState('Startup');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await Negotiate({
                role,
                city,
                experience: Number(experience),
                currentOffer: Number(currentOffer),
                companySize
            });
            onSubmit(result);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="salary-form">
            <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
            <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
            <input type="number" placeholder="Years of Experience" value={experience} onChange={(e) => setExperience(e.target.value === '' ? '' : Number(e.target.value))} required />
            <input type="number" placeholder="Current Offer" value={currentOffer} onChange={(e) => setCurrentOffer(e.target.value === '' ? '' : Number(e.target.value))} required />
            <select value={companySize} onChange={(e) => setCompanySize(e.target.value)} required>
                <option value="Startup">Startup</option>
                <option value="Mid-size">Mid-size</option>
                <option value="Enterprise">Enterprise</option>
            </select>
            <button type="submit" disabled={loading}>{loading ? 'Calculating...' : 'Submit'}</button>
        </form>
    );
};

export default SalaryForm;