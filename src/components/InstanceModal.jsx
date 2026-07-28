import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const useCaseOptions = [
  'CRM / Sales',
  'Support Desk / Ticketing',
  'Project / Task Management',
  'Internal Tools / Ops',
  'HR / Payroll',
  'Marketing Website',
  'E-commerce',
  'Education / LMS',
  'Productivity / Collaboration',
  'Other',
];

const countryOptions = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
  'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso',
  'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic',
  'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Costa Rica', "Côte d'Ivoire", 'Croatia',
  'Cuba', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti',
  'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
  'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'The Gambia',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
  'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
  'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
  'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
  'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
  'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco',
  'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
  'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia',
  'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
  'Philippines', 'Poland', 'Portugal', 'Qatar', 'Republic of the Congo', 'Romania', 'Russia',
  'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa',
  'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
  'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
  'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
  'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga',
  'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine',
  'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
  'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
];

function DropdownField({ label, value, placeholder, options, onSelect, open, onToggle, error }) {
  return (
    <div>
      <label className="block text-sm text-gray-700">{label}</label>
      <div className="relative mt-1">
        <button
          type="button"
          onClick={onToggle}
          className={`flex w-full items-center justify-between px-3 py-2 rounded-none bg-white text-left focus:outline-none focus:ring-0 ${error ? 'border border-red-500' : 'border border-gray-300'}`}
        >
          <span className={value ? 'text-black' : 'text-gray-500'}>{value || placeholder}</span>
          <ChevronDown
            className={`ml-3 shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
            size={16}
          />
        </button>
        {open && (
          <div className="absolute left-0 right-0 top-full z-30 mt-1 border border-black bg-white shadow-none max-h-64 overflow-y-auto box-border max-w-full">
            {options.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className="block w-full border-b border-gray-200 px-3 py-2 text-left text-sm last:border-b-0 hover:bg-gray-100 focus:outline-none"
              >
                {option}
              </button>
            ))}
          </div>
        )}
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </div>
    </div>
  );
}

function slugify(str) {
  return (
    str || ''
  )
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function InstanceModal({ open, onClose }) {
  const [company, setCompany] = useState('');
  const [suite, setSuite] = useState('');
  const [domainType, setDomainType] = useState('Subdomain');
  const [subdomain, setSubdomain] = useState('');
  const [subdomainTouched, setSubdomainTouched] = useState(false);
  const [useCase, setUseCase] = useState('');
  const [country, setCountry] = useState('');
  const [openDropdown, setOpenDropdown] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [referral, setReferral] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const s = slugify(company);
    setSuite(s);
    if (!subdomainTouched) setSubdomain(s);
  }, [company, subdomainTouched]);

  useEffect(() => {
    if (!open) {
      // reset minimal state on close
      setCompany('');
      setSuite('');
      setDomainType('Subdomain');
      setSubdomain('');
      setSubdomainTouched(false);
      setUseCase('');
      setCountry('');
      setOpenDropdown('');
      setTagInput('');
      setTags([]);
      setReferral('');
    }
  }, [open]);

  // Prevent page-level scrolling (including horizontal) while modal is open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevOverflowX = document.body.style.overflowX;
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.overflowX = 'hidden';
    }
    return () => {
      document.body.style.overflow = prevOverflow || '';
      document.body.style.overflowX = prevOverflowX || '';
    };
  }, [open]);

  function addTag() {
    const t = tagInput.trim();
    if (t && tags.length < 20) {
      setTags(prev => [...prev, t]);
      setTagInput('');
    }
  }

  function removeTag(i) {
    setTags(prev => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // clear previous success message when re-submitting
    setSuccessMessage('');
    const newErrors = {};
    if (!company.trim()) newErrors.company = 'Company is required';
    if (!domainType) newErrors.domainType = 'Domain type is required';
    if (!useCase) newErrors.useCase = 'Use case is required';
    if (!country) newErrors.country = 'Country is required';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      company,
      suite,
      domainType,
      subdomain,
      useCase,
      country,
      tags,
      referral,
    };

    try {
      setLoading(true);
      setSubmitMessage('Creating instance...');
      // Placeholder API endpoint — replace with your real FusionSuite creation endpoint
      const res = await fetch('/api/fusionsuite/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Create failed', res.status, text);
        alert('Failed to create suite. Check console for details.');
        return;
      }

      const result = await res.json().catch(() => null);
      console.log('FusionSuite created', result || 'ok');
      // Show compact success message inline on the button row and keep modal open
      setSuccessMessage('Instance created');
      setSubmitMessage('');
      // Auto-hide the success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      // Clear all form fields after successful creation
      setCompany('');
      setSuite('');
      setDomainType('Subdomain');
      setSubdomain('');
      setSubdomainTouched(false);
      setUseCase('');
      setCountry('');
      setOpenDropdown('');
      setTagInput('');
      setTags([]);
      setReferral('');
      setErrors({});
    } catch (err) {
      console.error('Create request error', err);
      setSubmitMessage('Failed to create instance');
      setTimeout(() => setSubmitMessage(''), 2000);
      alert('An error occurred while creating the suite.');
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className="bg-white shadow-2xl border border-gray-200 overflow-hidden"
        style={{
          width: "700px",
          maxWidth: "96vw",
          maxHeight: "92vh",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[92vh] px-4 py-6 lg:px-8"
        > <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-medium">Suite Configuration</h3>
            <button type="button" onClick={onClose} className="text-gray-600">Close</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Company/Professional Name</label>
              <input
                value={company}
                onChange={e => { setCompany(e.target.value); setErrors(prev => ({ ...prev, company: undefined })); }}
                placeholder="e.g. My Company Pvt Ltd"
                aria-required
                aria-invalid={errors.company ? 'true' : 'false'}
                className={`mt-1 block w-full min-w-0 px-3 py-2 rounded-none focus:outline-none focus:ring-0 ${errors.company ? 'border border-red-500' : 'border border-gray-300 focus:border-black focus:border-2'}`}
              />
              {errors.company && <p className="text-xs text-red-600 mt-1">{errors.company}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-700">Suite Name <span className="text-xs text-gray-400">AUTO-GENERATED</span></label>
              <input value={suite} readOnly placeholder="e.g. my-suite" className="mt-1 block w-full min-w-0 border border-gray-300 px-3 py-2 rounded-none bg-gray-50 focus:outline-none focus:ring-0 focus:border-black focus:border-2" />
            </div>

            <DropdownField
              label="Domain Type"
              value={domainType}
              placeholder="Select domain type"
              options={['Subdomain', 'Custom Domain']}
              open={openDropdown === 'domainType'}
              onToggle={() => setOpenDropdown(openDropdown === 'domainType' ? '' : 'domainType')}
              onSelect={option => {
                setDomainType(option);
                setOpenDropdown('');
                setErrors(prev => ({ ...prev, domainType: undefined }));
              }}
              error={errors.domainType}
            />

            <div>
              <label className="block text-sm text-gray-700">Subdomain Name</label>
              <div className="mt-1 flex items-center">
                <input value={subdomain} onChange={e => setSubdomain(e.target.value)} placeholder="e.g. mycompany" className="flex-1 min-w-0 border border-gray-300 px-3 py-2 rounded-none focus:outline-none focus:ring-0 focus:border-black focus:border-2" />
                <span className="ml-2 text-gray-600">.nexusai.com</span>
              </div>
            </div>
          </div>

          <hr className="my-6" />

          <h4 className="text-lg font-medium mb-4">Additional Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DropdownField
              label="Use Case"
              value={useCase}
              placeholder="Select your use case"
              options={useCaseOptions}
              open={openDropdown === 'useCase'}
              onToggle={() => setOpenDropdown(openDropdown === 'useCase' ? '' : 'useCase')}
              onSelect={option => {
                setUseCase(option);
                setOpenDropdown('');
                setErrors(prev => ({ ...prev, useCase: undefined }));
              }}
              error={errors.useCase}
            />

            <DropdownField
              label="Country"
              value={country}
              placeholder="Select your country"
              options={countryOptions}
              open={openDropdown === 'country'}
              onToggle={() => setOpenDropdown(openDropdown === 'country' ? '' : 'country')}
              onSelect={option => {
                setCountry(option);
                setOpenDropdown('');
                setErrors(prev => ({ ...prev, country: undefined }));
              }}
              error={errors.country}
            />

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700">Tags <span className="text-xs text-gray-400">Optional — add tags for your future reference to help identify or organize this Fusion Suite.</span></label>
              <div className="mt-1 flex gap-2">
                <input value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="Add tag and press Enter" className="flex-1 min-w-0 border border-gray-300 px-3 py-2 rounded-none focus:outline-none focus:ring-0 focus:border-black focus:border-2" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} />
                <button type="button" onClick={addTag} className="px-3 py-2 bg-black text-white rounded-none border border-gray-300 focus:outline-none focus:ring-0 focus:border-black focus:border-2">+</button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((t, i) => (
                  <span key={i} className="inline-flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-none">
                    {t}
                    <button type="button" onClick={() => removeTag(i)} className="text-xs text-red-500">x</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700">Referral Code <span className="text-xs text-gray-400">Optional</span></label>
              <input value={referral} onChange={e => setReferral(e.target.value)} placeholder="Enter referral code" className="mt-1 block w-full min-w-0 border border-gray-300 px-3 py-2 rounded-none focus:outline-none focus:ring-0 focus:border-black focus:border-2" />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6">
            {successMessage && (
              <div className="mr-4 text-sm text-green-700 self-center">
                {successMessage}
              </div>
            )}
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-0 focus:border-black focus:border-2">Back</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white rounded-none border border-gray-300 focus:outline-none focus:ring-0 focus:border-black focus:border-2">
              {loading ? 'Creating...' : 'Create Suite'}
            </button>
          </div>
        </form>
      </div>
      {submitMessage && (
        <div className="fixed inset-0 z-60 flex items-center justify-center pointer-events-auto">
          <div className="bg-white border border-gray-300 px-6 py-4 rounded-none shadow-lg text-center">
            <p className="text-sm font-medium">{submitMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
