import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertCircle, TrendingDown, Zap, Target, Flame, BarChart3, User, Heart, Activity, Cigarette, Wine, Dumbbell, Plus, Sparkles, TrendingUp } from 'lucide-react';

export default function LifeCalculatorV3() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    birthDate: '',
    gender: '',
    country: '',
    smoker: 'no',
    alcohol: 'moderate',
    exercise: 'moderate',
    bmi: 'normal',
    chronicDisease: 'none',
    stress: 'moderate',
    sleep: 'good',
    sleepHours: '7',
    screenTime: '4',
    socialMedia: '2',
    productivity: 'average',
    commute: '30',
    morningRoutine: '30',
    eveningRoutine: '30',
    commuteProductivity: 'waste'
  });
  const [showResults, setShowResults] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [secondsWasted, setSecondsWasted] = useState(0);
  const [commitment, setCommitment] = useState('');
  const [showCommitment, setShowCommitment] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [commitmentSaved, setCommitmentSaved] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (showResults) setSecondsWasted(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [showResults]);

  useEffect(() => {
    if (showResults) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showResults]);

  // Country flags
  const countryFlags = {
    'Afghanistan': '🇦🇫', 'Albania': '🇦🇱', 'Algeria': '🇩🇿', 'Andorra': '🇦🇩', 'Angola': '🇦🇴',
    'Argentina': '🇦🇷', 'Armenia': '🇦🇲', 'Australia': '🇦🇺', 'Austria': '🇦🇹', 'Azerbaijan': '🇦🇿',
    'Bahamas': '🇧🇸', 'Bahrain': '🇧🇭', 'Bangladesh': '🇧🇩', 'Barbados': '🇧🇧', 'Belarus': '🇧🇾',
    'Belgium': '🇧🇪', 'Belize': '🇧🇿', 'Benin': '🇧🇯', 'Bhutan': '🇧🇹', 'Bolivia': '🇧🇴',
    'Bosnia and Herzegovina': '🇧🇦', 'Botswana': '🇧🇼', 'Brazil': '🇧🇷', 'Brunei': '🇧🇳', 'Bulgaria': '🇧🇬',
    'Burkina Faso': '🇧🇫', 'Burundi': '🇧🇮', 'Cambodia': '🇰🇭', 'Cameroon': '🇨🇲', 'Canada': '🇨🇦',
    'Cape Verde': '🇨🇻', 'Central African Republic': '🇨🇫', 'Chad': '🇹🇩', 'Chile': '🇨🇱', 'China': '🇨🇳',
    'Colombia': '🇨🇴', 'Comoros': '🇰🇲', 'Congo': '🇨🇬', 'Costa Rica': '🇨🇷', 'Croatia': '🇭🇷',
    'Cuba': '🇨🇺', 'Cyprus': '🇨🇾', 'Czech Republic': '🇨🇿', 'Denmark': '🇩🇰', 'Djibouti': '🇩🇯',
    'Dominican Republic': '🇩🇴', 'Ecuador': '🇪🇨', 'Egypt': '🇪🇬', 'El Salvador': '🇸🇻', 'Equatorial Guinea': '🇬🇶',
    'Eritrea': '🇪🇷', 'Estonia': '🇪🇪', 'Eswatini': '🇸🇿', 'Ethiopia': '🇪🇹', 'Fiji': '🇫🇯',
    'Finland': '🇫🇮', 'France': '🇫🇷', 'Gabon': '🇬🇦', 'Gambia': '🇬🇲', 'Georgia': '🇬🇪',
    'Germany': '🇩🇪', 'Ghana': '🇬🇭', 'Greece': '🇬🇷', 'Grenada': '🇬🇩', 'Guatemala': '🇬🇹',
    'Guinea': '🇬🇳', 'Guinea-Bissau': '🇬🇼', 'Guyana': '🇬🇾', 'Haiti': '🇭🇹', 'Honduras': '🇭🇳',
    'Hong Kong': '🇭🇰', 'Hungary': '🇭🇺', 'Iceland': '🇮🇸', 'India': '🇮🇳', 'Indonesia': '🇮🇩',
    'Iran': '🇮🇷', 'Iraq': '🇮🇶', 'Ireland': '🇮🇪', 'Israel': '🇮🇱', 'Italy': '🇮🇹',
    'Jamaica': '🇯🇲', 'Japan': '🇯🇵', 'Jordan': '🇯🇴', 'Kazakhstan': '🇰🇿', 'Kenya': '🇰🇪',
    'Kuwait': '🇰🇼', 'Kyrgyzstan': '🇰🇬', 'Laos': '🇱🇦', 'Latvia': '🇱🇻', 'Lebanon': '🇱🇧',
    'Lesotho': '🇱🇸', 'Liberia': '🇱🇷', 'Libya': '🇱🇾', 'Lithuania': '🇱🇹', 'Luxembourg': '🇱🇺',
    'Madagascar': '🇲🇬', 'Malawi': '🇲🇼', 'Malaysia': '🇲🇾', 'Maldives': '🇲🇻', 'Mali': '🇲🇱',
    'Malta': '🇲🇹', 'Mauritania': '🇲🇷', 'Mauritius': '🇲🇺', 'Mexico': '🇲🇽', 'Moldova': '🇲🇩',
    'Monaco': '🇲🇨', 'Mongolia': '🇲🇳', 'Montenegro': '🇲🇪', 'Morocco': '🇲🇦', 'Mozambique': '🇲🇿',
    'Myanmar': '🇲🇲', 'Namibia': '🇳🇦', 'Nepal': '🇳🇵', 'Netherlands': '🇳🇱', 'New Zealand': '🇳🇿',
    'Nicaragua': '🇳🇮', 'Niger': '🇳🇪', 'Nigeria': '🇳🇬', 'North Korea': '🇰🇵', 'North Macedonia': '🇲🇰',
    'Norway': '🇳🇴', 'Oman': '🇴🇲', 'Pakistan': '🇵🇰', 'Palestine': '🇵🇸', 'Panama': '🇵🇦',
    'Papua New Guinea': '🇵🇬', 'Paraguay': '🇵🇾', 'Peru': '🇵🇪', 'Philippines': '🇵🇭', 'Poland': '🇵🇱',
    'Portugal': '🇵🇹', 'Qatar': '🇶🇦', 'Romania': '🇷🇴', 'Russia': '🇷🇺', 'Rwanda': '🇷🇼',
    'Saint Lucia': '🇱🇨', 'Samoa': '🇼🇸', 'San Marino': '🇸🇲', 'Saudi Arabia': '🇸🇦', 'Senegal': '🇸🇳',
    'Serbia': '🇷🇸', 'Seychelles': '🇸🇨', 'Sierra Leone': '🇸🇱', 'Singapore': '🇸🇬', 'Slovakia': '🇸🇰',
    'Slovenia': '🇸🇮', 'Solomon Islands': '🇸🇧', 'Somalia': '🇸🇴', 'South Africa': '🇿🇦', 'South Korea': '🇰🇷',
    'South Sudan': '🇸🇸', 'Spain': '🇪🇸', 'Sri Lanka': '🇱🇰', 'Sudan': '🇸🇩', 'Suriname': '🇸🇷',
    'Sweden': '🇸🇪', 'Switzerland': '🇨🇭', 'Syria': '🇸🇾', 'Taiwan': '🇹🇼', 'Tajikistan': '🇹🇯',
    'Tanzania': '🇹🇿', 'Thailand': '🇹🇭', 'Timor-Leste': '🇹🇱', 'Togo': '🇹🇬', 'Tonga': '🇹🇴',
    'Trinidad and Tobago': '🇹🇹', 'Tunisia': '🇹🇳', 'Turkey': '🇹🇷', 'Turkmenistan': '🇹🇲', 'Uganda': '🇺🇬',
    'Ukraine': '🇺🇦', 'United Arab Emirates': '🇦🇪', 'United Kingdom': '🇬🇧', 'United States': '🇺🇸', 'Uruguay': '🇺🇾',
    'Uzbekistan': '🇺🇿', 'Vanuatu': '🇻🇺', 'Vatican City': '🇻🇦', 'Venezuela': '🇻🇪', 'Vietnam': '🇻🇳',
    'Yemen': '🇾🇪', 'Zambia': '🇿🇲', 'Zimbabwe': '🇿🇼'
  };

  const popularCountries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
    'France', 'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Spain',
    'Italy', 'Netherlands', 'Sweden', 'Norway', 'Singapore'
  ];

  // Comprehensive life expectancy data (2024-2025 projections with longevity advances)
  const lifeExpectancyData = {
    'Afghanistan': { male: 64, female: 67 },
    'Albania': { male: 77, female: 81 },
    'Algeria': { male: 76, female: 78 },
    'Andorra': { male: 81, female: 86 },
    'Angola': { male: 60, female: 64 },
    'Argentina': { male: 73, female: 80 },
    'Armenia': { male: 72, female: 79 },
    'Australia': { male: 82, female: 86 },
    'Austria': { male: 80, female: 84 },
    'Azerbaijan': { male: 71, female: 76 },
    'Bahamas': { male: 72, female: 78 },
    'Bahrain': { male: 76, female: 78 },
    'Bangladesh': { male: 72, female: 75 },
    'Barbados': { male: 76, female: 79 },
    'Belarus': { male: 70, female: 80 },
    'Belgium': { male: 80, female: 84 },
    'Belize': { male: 71, female: 77 },
    'Benin': { male: 61, female: 63 },
    'Bhutan': { male: 71, female: 72 },
    'Bolivia': { male: 69, female: 74 },
    'Bosnia and Herzegovina': { male: 75, female: 80 },
    'Botswana': { male: 65, female: 70 },
    'Brazil': { male: 73, female: 80 },
    'Brunei': { male: 74, female: 77 },
    'Bulgaria': { male: 72, female: 79 },
    'Burkina Faso': { male: 60, female: 62 },
    'Burundi': { male: 61, female: 64 },
    'Cambodia': { male: 68, female: 72 },
    'Cameroon': { male: 59, female: 61 },
    'Canada': { male: 81, female: 85 },
    'Cape Verde': { male: 71, female: 78 },
    'Central African Republic': { male: 53, female: 56 },
    'Chad': { male: 54, female: 56 },
    'Chile': { male: 78, female: 83 },
    'China': { male: 76, female: 81 },
    'Colombia': { male: 74, female: 80 },
    'Comoros': { male: 63, female: 66 },
    'Congo': { male: 63, female: 66 },
    'Costa Rica': { male: 78, female: 83 },
    'Croatia': { male: 76, female: 82 },
    'Cuba': { male: 77, female: 81 },
    'Cyprus': { male: 79, female: 83 },
    'Czech Republic': { male: 77, female: 82 },
    'Denmark': { male: 80, female: 84 },
    'Djibouti': { male: 66, female: 69 },
    'Dominican Republic': { male: 72, female: 78 },
    'Ecuador': { male: 75, female: 80 },
    'Egypt': { male: 71, female: 74 },
    'El Salvador': { male: 71, female: 78 },
    'Equatorial Guinea': { male: 58, female: 61 },
    'Eritrea': { male: 65, female: 69 },
    'Estonia': { male: 75, female: 83 },
    'Eswatini': { male: 57, female: 63 },
    'Ethiopia': { male: 66, female: 69 },
    'Fiji': { male: 68, female: 73 },
    'Finland': { male: 80, female: 85 },
    'France': { male: 80, female: 86 },
    'Gabon': { male: 65, female: 68 },
    'Gambia': { male: 62, female: 64 },
    'Georgia': { male: 71, female: 79 },
    'Germany': { male: 79, female: 84 },
    'Ghana': { male: 63, female: 65 },
    'Greece': { male: 79, female: 84 },
    'Grenada': { male: 71, female: 75 },
    'Guatemala': { male: 72, female: 78 },
    'Guinea': { male: 61, female: 62 },
    'Guinea-Bissau': { male: 58, female: 61 },
    'Guyana': { male: 67, female: 72 },
    'Haiti': { male: 63, female: 67 },
    'Honduras': { male: 73, female: 77 },
    'Hong Kong': { male: 83, female: 88 },
    'Hungary': { male: 74, female: 81 },
    'Iceland': { male: 81, female: 84 },
    'India': { male: 71, female: 74 },
    'Indonesia': { male: 70, female: 74 },
    'Iran': { male: 75, female: 78 },
    'Iraq': { male: 69, female: 72 },
    'Ireland': { male: 80, female: 84 },
    'Israel': { male: 81, female: 85 },
    'Italy': { male: 82, female: 86 },
    'Jamaica': { male: 73, female: 77 },
    'Japan': { male: 82, female: 88 },
    'Jordan': { male: 73, female: 76 },
    'Kazakhstan': { male: 70, female: 77 },
    'Kenya': { male: 66, female: 70 },
    'Kuwait': { male: 74, female: 76 },
    'Kyrgyzstan': { male: 69, female: 76 },
    'Laos': { male: 67, female: 70 },
    'Latvia': { male: 72, female: 81 },
    'Lebanon': { male: 77, female: 81 },
    'Lesotho': { male: 53, female: 57 },
    'Liberia': { male: 63, female: 65 },
    'Libya': { male: 71, female: 76 },
    'Lithuania': { male: 73, female: 82 },
    'Luxembourg': { male: 80, female: 84 },
    'Madagascar': { male: 65, female: 68 },
    'Malawi': { male: 63, female: 67 },
    'Malaysia': { male: 74, female: 78 },
    'Maldives': { male: 77, female: 80 },
    'Mali': { male: 59, female: 60 },
    'Malta': { male: 80, female: 84 },
    'Mauritania': { male: 63, female: 66 },
    'Mauritius': { male: 72, female: 78 },
    'Mexico': { male: 73, female: 79 },
    'Moldova': { male: 68, female: 76 },
    'Monaco': { male: 85, female: 89 },
    'Mongolia': { male: 67, female: 75 },
    'Montenegro': { male: 75, female: 80 },
    'Morocco': { male: 75, female: 78 },
    'Mozambique': { male: 59, female: 64 },
    'Myanmar': { male: 66, female: 70 },
    'Namibia': { male: 63, female: 67 },
    'Nepal': { male: 70, female: 72 },
    'Netherlands': { male: 81, female: 84 },
    'New Zealand': { male: 81, female: 84 },
    'Nicaragua': { male: 73, female: 79 },
    'Niger': { male: 62, female: 63 },
    'Nigeria': { male: 54, female: 56 },
    'North Korea': { male: 68, female: 75 },
    'North Macedonia': { male: 74, female: 78 },
    'Norway': { male: 82, female: 85 },
    'Oman': { male: 77, female: 80 },
    'Pakistan': { male: 67, female: 69 },
    'Palestine': { male: 73, female: 76 },
    'Panama': { male: 76, female: 82 },
    'Papua New Guinea': { male: 63, female: 66 },
    'Paraguay': { male: 72, female: 77 },
    'Peru': { male: 75, female: 79 },
    'Philippines': { male: 69, female: 75 },
    'Poland': { male: 75, female: 82 },
    'Portugal': { male: 79, female: 85 },
    'Qatar': { male: 78, female: 81 },
    'Romania': { male: 73, female: 80 },
    'Russia': { male: 69, female: 79 },
    'Rwanda': { male: 67, female: 71 },
    'Saint Lucia': { male: 74, female: 78 },
    'Samoa': { male: 71, female: 76 },
    'San Marino': { male: 82, female: 87 },
    'Saudi Arabia': { male: 75, female: 78 },
    'Senegal': { male: 67, female: 70 },
    'Serbia': { male: 74, female: 79 },
    'Seychelles': { male: 71, female: 78 },
    'Sierra Leone': { male: 54, female: 56 },
    'Singapore': { male: 82, female: 87 },
    'Slovakia': { male: 74, female: 81 },
    'Slovenia': { male: 79, female: 84 },
    'Solomon Islands': { male: 71, female: 74 },
    'Somalia': { male: 56, female: 59 },
    'South Africa': { male: 63, female: 69 },
    'South Korea': { male: 81, female: 87 },
    'South Sudan': { male: 57, female: 59 },
    'Spain': { male: 81, female: 87 },
    'Sri Lanka': { male: 74, female: 80 },
    'Sudan': { male: 65, female: 68 },
    'Suriname': { male: 69, female: 74 },
    'Sweden': { male: 82, female: 85 },
    'Switzerland': { male: 83, female: 86 },
    'Syria': { male: 70, female: 76 },
    'Taiwan': { male: 78, female: 85 },
    'Tajikistan': { male: 69, female: 74 },
    'Tanzania': { male: 65, female: 68 },
    'Thailand': { male: 74, female: 81 },
    'Timor-Leste': { male: 68, female: 71 },
    'Togo': { male: 61, female: 63 },
    'Tonga': { male: 70, female: 75 },
    'Trinidad and Tobago': { male: 71, female: 77 },
    'Tunisia': { male: 75, female: 79 },
    'Turkey': { male: 76, female: 81 },
    'Turkmenistan': { male: 65, female: 71 },
    'Uganda': { male: 62, female: 66 },
    'Ukraine': { male: 68, female: 77 },
    'United Arab Emirates': { male: 78, female: 80 },
    'United Kingdom': { male: 80, female: 84 },
    'United States': { male: 77, female: 82 },
    'Uruguay': { male: 74, female: 81 },
    'Uzbekistan': { male: 70, female: 75 },
    'Vanuatu': { male: 69, female: 72 },
    'Vatican City': { male: 82, female: 85 },
    'Venezuela': { male: 70, female: 77 },
    'Vietnam': { male: 73, female: 80 },
    'Yemen': { male: 65, female: 68 },
    'Zambia': { male: 63, female: 67 },
    'Zimbabwe': { male: 61, female: 64 }
  };

  const calculateRealisticLifeExpectancy = () => {
    const baseExpectancy = lifeExpectancyData[formData.country]?.[formData.gender] || 75;
    let adjustedExpectancy = baseExpectancy;

    // Longevity revolution bonus (2025-2045 projections)
    const longevityBonus = 3; // Conservative estimate for medical advances
    adjustedExpectancy += longevityBonus;

    // Smoking impact
    if (formData.smoker === 'yes-heavy') adjustedExpectancy -= 12;
    else if (formData.smoker === 'yes-light') adjustedExpectancy -= 5;

    // Alcohol impact
    if (formData.alcohol === 'heavy') adjustedExpectancy -= 5;
    else if (formData.alcohol === 'light') adjustedExpectancy += 1;
    else if (formData.alcohol === 'none') adjustedExpectancy += 2;

    // Exercise impact
    if (formData.exercise === 'high') adjustedExpectancy += 5;
    else if (formData.exercise === 'low') adjustedExpectancy -= 3;
    else if (formData.exercise === 'none') adjustedExpectancy -= 6;

    // BMI impact
    if (formData.bmi === 'obese') adjustedExpectancy -= 8;
    else if (formData.bmi === 'overweight') adjustedExpectancy -= 3;
    else if (formData.bmi === 'underweight') adjustedExpectancy -= 4;

    // Chronic disease impact
    if (formData.chronicDisease === 'major') adjustedExpectancy -= 10;
    else if (formData.chronicDisease === 'minor') adjustedExpectancy -= 5;

    // Stress impact
    if (formData.stress === 'high') adjustedExpectancy -= 4;
    else if (formData.stress === 'low') adjustedExpectancy += 2;

    // Sleep impact
    if (formData.sleep === 'poor') adjustedExpectancy -= 5;
    else if (formData.sleep === 'excellent') adjustedExpectancy += 3;

    return Math.max(Math.round(adjustedExpectancy), 50);
  };

  const calculatePotentialGains = () => {
    const gains = [];
    
    if (formData.smoker !== 'no') {
      gains.push({ 
        action: 'Quit Smoking', 
        years: formData.smoker === 'yes-heavy' ? 12 : 5,
        difficulty: 'Hard',
        timeframe: '3-6 months'
      });
    }
    
    if (formData.alcohol === 'heavy') {
      gains.push({ 
        action: 'Reduce Alcohol to Moderate', 
        years: 4,
        difficulty: 'Medium',
        timeframe: '1-3 months'
      });
    }
    
    if (formData.exercise === 'none' || formData.exercise === 'low') {
      gains.push({ 
        action: 'Exercise 150min/week', 
        years: formData.exercise === 'none' ? 6 : 4,
        difficulty: 'Medium',
        timeframe: 'Start today'
      });
    }
    
    if (formData.bmi === 'obese') {
      gains.push({ 
        action: 'Reach Normal BMI', 
        years: 8,
        difficulty: 'Hard',
        timeframe: '6-18 months'
      });
    } else if (formData.bmi === 'overweight') {
      gains.push({ 
        action: 'Reach Normal BMI', 
        years: 3,
        difficulty: 'Medium',
        timeframe: '3-12 months'
      });
    }
    
    if (formData.stress === 'high') {
      gains.push({ 
        action: 'Stress Management (meditation, therapy)', 
        years: 4,
        difficulty: 'Medium',
        timeframe: '1-2 months'
      });
    }
    
    if (formData.sleep === 'poor') {
      gains.push({ 
        action: 'Improve Sleep to 7-9h/night', 
        years: 5,
        difficulty: 'Easy',
        timeframe: '2-4 weeks'
      });
    }
    
    // Longevity hacks
    if (formData.exercise !== 'high' && formData.bmi === 'normal') {
      gains.push({ 
        action: 'Add Strength Training 2x/week', 
        years: 2,
        difficulty: 'Easy',
        timeframe: 'Start today'
      });
    }
    
    return gains;
  };

  const calculateLife = () => {
    if (!formData.birthDate) return null;
    
    const birth = new Date(formData.birthDate);
    const now = new Date();
    const lifeExpectancy = calculateRealisticLifeExpectancy();
    const endDate = new Date(birth);
    endDate.setFullYear(birth.getFullYear() + lifeExpectancy);
    
    const totalDays = Math.floor((endDate - birth) / (1000 * 60 * 60 * 24));
    const daysLived = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
    const daysLeft = Math.max(totalDays - daysLived, 0);
    const weeksLeft = Math.floor(daysLeft / 7);
    const monthsLeft = Math.floor(daysLeft / 30);
    const yearsLived = (now - birth) / (1000 * 60 * 60 * 24 * 365.25);
    const percentLived = (daysLived / totalDays) * 100;
    
    const hoursLeft = daysLeft * 24;
    
    // More precise sleep calculation based on actual hours
    const sleepHoursPerDay = parseFloat(formData.sleepHours);
    const avgSleepHours = daysLeft * sleepHoursPerDay;
    
    // Calculate waste hours based on actual activities
    const screenTimePerDay = parseFloat(formData.screenTime);
    const socialMediaPerDay = parseFloat(formData.socialMedia);
    const commuteMinutes = parseFloat(formData.commute);
    const commuteHoursPerDay = (commuteMinutes * 2) / 60; // Round trip
    const morningRoutineHours = parseFloat(formData.morningRoutine) / 60;
    const eveningRoutineHours = parseFloat(formData.eveningRoutine) / 60;
    
    // Check if commute time overlaps with screen/social media
    const commuteIsProductive = formData.commuteProductivity === 'productive';
    const commuteOverlap = commuteIsProductive ? commuteHoursPerDay : 0;
    
    // Productivity waste (time spent distracted, procrastinating during work/tasks)
    let productivityWaste = 0;
    if (formData.productivity === 'distracted') productivityWaste = 4; // Frequently distracted, procrastinate often
    else if (formData.productivity === 'average') productivityWaste = 2; // Some distractions, occasional procrastination
    else if (formData.productivity === 'focused') productivityWaste = 0.5; // Focused, rarely distracted
    
    // Total daily waste (subtract overlap if commute is productive)
    const dailyWasteHours = screenTimePerDay + socialMediaPerDay + 
                            (commuteIsProductive ? 0 : commuteHoursPerDay) + 
                            productivityWaste + morningRoutineHours + eveningRoutineHours;
    
    const wasteHours = Math.floor(daysLeft * dailyWasteHours);
    
    // Usable hours = Total - Sleep - Waste - Basic maintenance (eating, hygiene beyond routine)
    const maintenanceHours = daysLeft * 2; // Basic eating time
    const usableHours = Math.floor(hoursLeft - avgSleepHours - wasteHours - maintenanceHours);
    
    const saturdaysLeft = Math.floor(weeksLeft);
    const sundaysLeft = Math.floor(weeksLeft);
    const christmasLeft = Math.floor((daysLeft / 365.25));
    const birthdaysLeft = Math.floor((daysLeft / 365.25));
    
    const healthScore = calculateHealthScore();
    const qualityYears = Math.floor((daysLeft / 365) * (healthScore / 100));
    const potentialGains = calculatePotentialGains();
    const totalPotentialYears = potentialGains.reduce((sum, gain) => sum + gain.years, 0);
    
    // Breakdown of waste
    const wasteBreakdown = {
      screenTime: Math.floor(daysLeft * screenTimePerDay),
      socialMedia: Math.floor(daysLeft * socialMediaPerDay),
      commute: commuteIsProductive ? 0 : Math.floor(daysLeft * commuteHoursPerDay),
      productivity: Math.floor(daysLeft * productivityWaste),
      morningRoutine: Math.floor(daysLeft * morningRoutineHours),
      eveningRoutine: Math.floor(daysLeft * eveningRoutineHours),
      commuteOverlap: commuteOverlap > 0
    };
    
    return {
      daysLeft,
      weeksLeft,
      monthsLeft,
      hoursLeft,
      percentLived: percentLived.toFixed(1),
      yearsLived: yearsLived.toFixed(1),
      usableHours: Math.max(usableHours, 0),
      wasteHours,
      avgSleepHours: Math.floor(avgSleepHours),
      saturdaysLeft,
      sundaysLeft,
      christmasLeft,
      birthdaysLeft,
      lifeExpectancy,
      qualityYears,
      healthScore,
      potentialGains,
      totalPotentialYears,
      wasteBreakdown,
      dailyWasteHours: dailyWasteHours.toFixed(1),
      endDate: endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
  };

  const calculateHealthScore = () => {
    let score = 100; // Start at perfect
    
    // Deductions for negative factors
    if (formData.smoker === 'yes-heavy') score -= 25;
    else if (formData.smoker === 'yes-light') score -= 15;
    
    if (formData.alcohol === 'heavy') score -= 20;
    else if (formData.alcohol === 'moderate') score -= 10;
    else if (formData.alcohol === 'light') score -= 5;
    
    if (formData.exercise === 'none') score -= 25;
    else if (formData.exercise === 'low') score -= 15;
    else if (formData.exercise === 'moderate') score -= 5;
    
    if (formData.bmi === 'obese') score -= 25;
    else if (formData.bmi === 'overweight') score -= 15;
    else if (formData.bmi === 'underweight') score -= 10;
    
    if (formData.chronicDisease === 'major') score -= 30;
    else if (formData.chronicDisease === 'minor') score -= 15;
    
    if (formData.stress === 'high') score -= 20;
    else if (formData.stress === 'moderate') score -= 10;
    
    if (formData.sleep === 'poor') score -= 20;
    else if (formData.sleep === 'good') score -= 5;
    
    // BONUS: Good routines improve health
    const morningMin = parseFloat(formData.morningRoutine);
    const eveningMin = parseFloat(formData.eveningRoutine);
    
    // Optimal routine time: 20-45 min (shows self-care without being excessive)
    if (morningMin >= 20 && morningMin <= 45) score += 2;
    if (eveningMin >= 20 && eveningMin <= 45) score += 3; // Evening routine more important for sleep quality
    
    // Too rushed (under 15 min) = stress/poor hygiene
    if (morningMin < 15) score -= 3;
    if (eveningMin < 15) score -= 2;
    
    return Math.max(Math.min(score, 100), 0);
  };

  const getRiskFactors = () => {
    const risks = [];
    if (formData.smoker !== 'no') risks.push({ 
      factor: 'Smoking', 
      impact: 'HIGH', 
      years: formData.smoker === 'yes-heavy' ? -12 : -5 
    });
    if (formData.alcohol === 'heavy') risks.push({ 
      factor: 'Heavy Drinking', 
      impact: 'MEDIUM', 
      years: -5 
    });
    if (formData.exercise === 'none' || formData.exercise === 'low') risks.push({ 
      factor: 'Low Exercise', 
      impact: 'HIGH', 
      years: formData.exercise === 'none' ? -6 : -3 
    });
    if (formData.bmi === 'obese') risks.push({ 
      factor: 'Obesity', 
      impact: 'HIGH', 
      years: -8 
    });
    if (formData.chronicDisease !== 'none') risks.push({ 
      factor: 'Chronic Disease', 
      impact: 'HIGH', 
      years: formData.chronicDisease === 'major' ? -10 : -5 
    });
    if (formData.stress === 'high') risks.push({ 
      factor: 'High Stress', 
      impact: 'MEDIUM', 
      years: -4 
    });
    if (formData.sleep === 'poor') risks.push({ 
      factor: 'Poor Sleep', 
      impact: 'MEDIUM', 
      years: -5 
    });
    return risks;
  };

  const handleNext = () => {
    setStep(step + 1);
    if (step === 3) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleCalculate = () => {
    setShowResults(true);
    setSecondsWasted(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = calculateLife();
  const risks = getRiskFactors();

  const milestones = [
    { at: 10, message: "10 seconds deciding if this matters" },
    { at: 30, message: "30 seconds gone forever" },
    { at: 60, message: "A full minute wasted reading" },
    { at: 120, message: "2 minutes... still not acting?" },
    { at: 300, message: "5 MINUTES. What are you waiting for?" }
  ];

  const getCurrentMilestone = () => {
    return milestones.reverse().find(m => secondsWasted >= m.at)?.message;
  };

  const countries = Object.keys(lifeExpectancyData).sort();
  
  const filteredCountries = searchTerm
    ? countries.filter(country =>
        country.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    : formData.country
    ? []
    : popularCountries;

  const handleKeyDown = (e) => {
    if (!showDropdown || filteredCountries.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredCountries.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCountries[selectedIndex]) {
        setFormData({...formData, country: filteredCountries[selectedIndex]});
        setSearchTerm('');
        setShowDropdown(false);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setSearchTerm('');
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-pulse"></div>
      </div>
      
      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 pt-8">
            <div className="inline-flex items-center gap-2 mb-4 px-6 py-3 bg-red-600 text-white font-bold text-sm tracking-widest animate-pulse">
              <Flame className="w-4 h-4" />
              TIME IS RUNNING OUT
              <Flame className="w-4 h-4" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight bg-gradient-to-r from-white via-red-400 to-white bg-clip-text text-transparent">
              TODAY<br/>
              You Stop Wasting<br/>
              Your Life
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Every breath you take brings you closer to the end. But most people live like they have infinite time. Let's see if you do.
            </p>
          </div>

          {!showResults && (
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-red-600 shadow-2xl shadow-red-900/50 mb-8">
                <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Step {step} of 5</span>
                  <span className="text-gray-400">{Math.round((step / 5) * 100)}% Complete</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-300"
                    style={{ width: `${(step / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-3">
                    <User className="w-7 h-7 text-red-500" />
                    Basic Information
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      When Were You Born?
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                      className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg text-white text-base focus:border-red-500 focus:outline-none transition-all"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      Gender
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['male', 'female'].map(gender => (
                        <button
                          key={gender}
                          onClick={() => setFormData({...formData, gender})}
                          className={`px-4 py-3 rounded-lg font-bold text-base transition-all ${
                            formData.gender === gender
                              ? 'bg-red-600 text-white border-2 border-red-500'
                              : 'bg-black/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Women live 4-6 years longer on average</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      Country
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Type to search or see popular countries..."
                        value={formData.country || searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setFormData({...formData, country: ''});
                          setShowDropdown(true);
                        }}
                        onFocus={() => {
                          setShowDropdown(true);
                          if (!searchTerm && !formData.country) {
                            setSearchTerm('');
                          }
                        }}
                        onKeyDown={handleKeyDown}
                        className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg text-white text-base focus:border-red-500 focus:outline-none transition-all"
                      />
                      {showDropdown && filteredCountries.length > 0 && !formData.country && (
                        <div className="absolute z-10 w-full mt-2 bg-gray-900 border-2 border-gray-700 rounded-lg max-h-80 overflow-y-auto shadow-2xl">
                          {!searchTerm && (
                            <div className="px-4 py-2 bg-gray-800 text-xs font-bold text-gray-400 uppercase tracking-wide sticky top-0">
                              ⭐ Popular Countries
                            </div>
                          )}
                          {searchTerm && filteredCountries.length > 50 && (
                            <div className="px-4 py-2 bg-yellow-900/30 text-xs text-yellow-400">
                              Showing first 50 of {filteredCountries.length} matches
                            </div>
                          )}
                          {filteredCountries.slice(0, 50).map((country, index) => (
                            <button
                              key={country}
                              onClick={() => {
                                setFormData({...formData, country: country});
                                setSearchTerm('');
                                setShowDropdown(false);
                              }}
                              onMouseEnter={() => setSelectedIndex(index)}
                              className={`w-full px-4 py-3 text-left transition-colors text-white border-b border-gray-800 last:border-b-0 flex justify-between items-center ${
                                index === selectedIndex ? 'bg-red-600' : 'hover:bg-red-600/70'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <span className="text-xl">{countryFlags[country]}</span>
                                <span>{country}</span>
                              </span>
                              <span className="text-xs text-gray-300 font-mono">
                                {lifeExpectancyData[country]?.male}-{lifeExpectancyData[country]?.female}y
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {formData.country && (
                      <div className="mt-2 px-4 py-3 bg-green-900/30 border-2 border-green-600 rounded-lg flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="text-2xl">{countryFlags[formData.country]}</span>
                          <span className="text-white font-bold">{formData.country}</span>
                        </span>
                        <button
                          onClick={() => {
                            setFormData({...formData, country: ''});
                            setSearchTerm('');
                            setShowDropdown(true);
                          }}
                          className="text-red-400 hover:text-red-300 font-bold text-sm px-3 py-1 bg-red-900/30 rounded"
                        >
                          Change
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {!formData.country && !searchTerm ? (
                        <span>💡 Try: <span className="text-white">United States, Japan, Norway</span></span>
                      ) : searchTerm && filteredCountries.length > 0 ? (
                        <span className="text-yellow-400">✓ {filteredCountries.length} matches found • Use ↑↓ arrows and Enter</span>
                      ) : searchTerm && filteredCountries.length === 0 ? (
                        <span className="text-red-400">No countries found</span>
                      ) : (
                        <span>Life expectancy varies by 35+ years globally</span>
                      )}
                    </p>
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!formData.birthDate || !formData.gender || !formData.country}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-all"
                  >
                    Next: Lifestyle Factors
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-3">
                    <Activity className="w-7 h-7 text-orange-500" />
                    Lifestyle Habits
                  </h2>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide flex items-center gap-2">
                      <Cigarette className="w-4 h-4" />
                      Smoking Status
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'no', label: 'Non-Smoker' },
                        { value: 'yes-light', label: 'Light' },
                        { value: 'yes-heavy', label: 'Heavy' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setFormData({...formData, smoker: option.value})}
                          className={`px-3 py-2.5 rounded-lg font-bold text-sm transition-all ${
                            formData.smoker === option.value
                              ? 'bg-red-600 text-white border-2 border-red-500'
                              : 'bg-black/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-red-400 mt-2">Heavy smoking: -12 years</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide flex items-center gap-2">
                      <Wine className="w-4 h-4" />
                      Alcohol
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { value: 'none', label: 'None' },
                        { value: 'light', label: 'Light' },
                        { value: 'moderate', label: 'Moderate' },
                        { value: 'heavy', label: 'Heavy' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setFormData({...formData, alcohol: option.value})}
                          className={`px-2 py-2.5 rounded-lg font-bold text-sm transition-all ${
                            formData.alcohol === option.value
                              ? 'bg-red-600 text-white border-2 border-red-500'
                              : 'bg-black/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Heavy drinking: -5 years</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide flex items-center gap-2">
                      <Dumbbell className="w-4 h-4" />
                      Exercise
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { value: 'none', label: 'None' },
                        { value: 'low', label: 'Low' },
                        { value: 'moderate', label: 'Moderate' },
                        { value: 'high', label: 'High' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setFormData({...formData, exercise: option.value})}
                          className={`px-2 py-2.5 rounded-lg font-bold text-sm transition-all ${
                            formData.exercise === option.value
                              ? 'bg-red-600 text-white border-2 border-red-500'
                              : 'bg-black/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-green-400 mt-2">High exercise: +5 years</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg rounded-lg transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg transition-all"
                    >
                      Next: Health
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-3">
                    <Heart className="w-7 h-7 text-red-500" />
                    Health & Time Usage
                  </h2>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      BMI Category
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { value: 'underweight', label: 'Under' },
                        { value: 'normal', label: 'Normal' },
                        { value: 'overweight', label: 'Over' },
                        { value: 'obese', label: 'Obese' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setFormData({...formData, bmi: option.value})}
                          className={`px-2 py-2.5 rounded-lg font-bold text-sm transition-all ${
                            formData.bmi === option.value
                              ? 'bg-red-600 text-white border-2 border-red-500'
                              : 'bg-black/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Obesity: -8 years</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      Chronic Disease
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'none', label: 'None' },
                        { value: 'minor', label: 'Minor' },
                        { value: 'major', label: 'Major' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setFormData({...formData, chronicDisease: option.value})}
                          className={`px-3 py-2.5 rounded-lg font-bold text-sm transition-all ${
                            formData.chronicDisease === option.value
                              ? 'bg-red-600 text-white border-2 border-red-500'
                              : 'bg-black/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Major disease: -10 years</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      Stress Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'low', label: 'Low' },
                        { value: 'moderate', label: 'Moderate' },
                        { value: 'high', label: 'High' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setFormData({...formData, stress: option.value})}
                          className={`px-3 py-2.5 rounded-lg font-bold text-sm transition-all ${
                            formData.stress === option.value
                              ? 'bg-red-600 text-white border-2 border-red-500'
                              : 'bg-black/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      Sleep Quality
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'poor', label: 'Poor' },
                        { value: 'good', label: 'Good' },
                        { value: 'excellent', label: 'Excellent' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setFormData({...formData, sleep: option.value})}
                          className={`px-3 py-2.5 rounded-lg font-bold text-sm transition-all ${
                            formData.sleep === option.value
                              ? 'bg-red-600 text-white border-2 border-red-500'
                              : 'bg-black/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Poor sleep: -5 years</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      Average Sleep Hours Per Night (This Week)
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="12"
                      step="0.5"
                      value={formData.sleepHours}
                      onChange={(e) => setFormData({...formData, sleepHours: e.target.value})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-400">3h</span>
                      <span className={`text-2xl font-black ${
                        parseFloat(formData.sleepHours) < 6 ? 'text-red-400' :
                        parseFloat(formData.sleepHours) < 7 ? 'text-orange-400' :
                        parseFloat(formData.sleepHours) <= 9 ? 'text-green-400' : 'text-yellow-400'
                      }`}>{formData.sleepHours}h</span>
                      <span className="text-gray-400">12h</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 text-center">Optimal: 7-9 hours</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg rounded-lg transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg transition-all"
                    >
                      Next: Time Waste
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-3">
                    <Clock className="w-7 h-7 text-orange-500" />
                    Daily Time Waste
                  </h2>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      Daily Screen Time (Entertainment, not work)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      step="0.5"
                      value={formData.screenTime}
                      onChange={(e) => setFormData({...formData, screenTime: e.target.value})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-400">0h</span>
                      <span className={`text-2xl font-black ${
                        parseFloat(formData.screenTime) <= 2 ? 'text-green-400' :
                        parseFloat(formData.screenTime) <= 4 ? 'text-yellow-400' :
                        parseFloat(formData.screenTime) <= 6 ? 'text-orange-400' : 'text-red-400'
                      }`}>{formData.screenTime}h/day</span>
                      <span className="text-gray-400">12h</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">TV, YouTube, Netflix, gaming, etc.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      Daily Social Media Time
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      step="0.5"
                      value={formData.socialMedia}
                      onChange={(e) => setFormData({...formData, socialMedia: e.target.value})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-400">0h</span>
                      <span className={`text-2xl font-black ${
                        parseFloat(formData.socialMedia) <= 1 ? 'text-green-400' :
                        parseFloat(formData.socialMedia) <= 2 ? 'text-yellow-400' :
                        parseFloat(formData.socialMedia) <= 4 ? 'text-orange-400' : 'text-red-400'
                      }`}>{formData.socialMedia}h/day</span>
                      <span className="text-gray-400">8h</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Instagram, TikTok, Twitter, Facebook, etc.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      Daily Commute (One Way)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="120"
                      step="5"
                      value={formData.commute}
                      onChange={(e) => setFormData({...formData, commute: e.target.value})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-400">0min</span>
                      <span className={`text-2xl font-black ${
                        parseFloat(formData.commute) <= 15 ? 'text-green-400' :
                        parseFloat(formData.commute) <= 30 ? 'text-yellow-400' :
                        parseFloat(formData.commute) <= 60 ? 'text-orange-400' : 'text-red-400'
                      }`}>{formData.commute} min</span>
                      <span className="text-gray-400">120min</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Round trip will be doubled</p>
                    
                    {parseFloat(formData.commute) > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-bold text-gray-300 mb-2">Do you use commute time productively?</p>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: 'waste', label: '❌ No - Just sitting/waiting' },
                            { value: 'productive', label: '✅ Yes - Reading/learning/working' }
                          ].map(option => (
                            <button
                              key={option.value}
                              onClick={() => setFormData({...formData, commuteProductivity: option.value})}
                              className={`px-3 py-2 rounded-lg font-bold text-xs transition-all ${
                                formData.commuteProductivity === option.value
                                  ? 'bg-red-600 text-white border-2 border-red-500'
                                  : 'bg-black/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                        {formData.commuteProductivity === 'productive' && (
                          <p className="text-xs text-green-400 mt-2">✓ Great! Commute won't count as wasted time.</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      Morning Routine Duration
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="120"
                      step="5"
                      value={formData.morningRoutine}
                      onChange={(e) => setFormData({...formData, morningRoutine: e.target.value})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-400">10min</span>
                      <span className={`text-2xl font-black ${
                        parseFloat(formData.morningRoutine) <= 30 ? 'text-green-400' :
                        parseFloat(formData.morningRoutine) <= 45 ? 'text-yellow-400' :
                        parseFloat(formData.morningRoutine) <= 60 ? 'text-orange-400' : 'text-red-400'
                      }`}>{formData.morningRoutine} min</span>
                      <span className="text-gray-400">120min</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Shower, skincare, grooming, getting dressed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      Evening Routine Duration
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      step="5"
                      value={formData.eveningRoutine}
                      onChange={(e) => setFormData({...formData, eveningRoutine: e.target.value})}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-400">10min</span>
                      <span className={`text-2xl font-black ${
                        parseFloat(formData.eveningRoutine) <= 30 ? 'text-green-400' :
                        parseFloat(formData.eveningRoutine) <= 45 ? 'text-yellow-400' :
                        parseFloat(formData.eveningRoutine) <= 60 ? 'text-orange-400' : 'text-red-400'
                      }`}>{formData.eveningRoutine} min</span>
                      <span className="text-gray-400">90min</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Teeth, skincare, wind-down routine before bed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-gray-200 uppercase tracking-wide">
                      How Focused Are You? (When Working/Studying)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'distracted', label: 'Distracted', desc: 'Frequently distracted, procrastinate often, check phone constantly' },
                        { value: 'average', label: 'Average', desc: 'Some distractions, occasional social media checks, decent focus' },
                        { value: 'focused', label: 'Focused', desc: 'Highly focused, rarely distracted, deep work sessions' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => setFormData({...formData, productivity: option.value})}
                          className={`px-3 py-4 rounded-lg font-bold text-sm transition-all ${
                            formData.productivity === option.value
                              ? 'bg-red-600 text-white border-2 border-red-500'
                              : 'bg-black/50 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <div className="mb-2">{option.label}</div>
                          <div className="text-xs font-normal leading-tight">{option.desc}</div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-gray-400 bg-black/30 rounded p-3">
                      <p className="font-bold mb-1">Estimated wasted time per day:</p>
                      <p>• Distracted: <span className="text-red-400">~4 hours</span> lost to distractions</p>
                      <p>• Average: <span className="text-yellow-400">~2 hours</span> lost to distractions</p>
                      <p>• Focused: <span className="text-green-400">~30 minutes</span> lost to distractions</p>
                    </div>
                  </div>

                  <div className="bg-yellow-900/30 border-2 border-yellow-600 rounded-lg p-4">
                    <p className="text-yellow-300 font-bold mb-2 text-sm">⏰ YOUR DAILY WASTE CALCULATION</p>
                    <div className="text-sm space-y-1 text-white mb-3">
                      <p>• Screen Time: <span className="font-bold">{formData.screenTime}h</span></p>
                      <p>• Social Media: <span className="font-bold">{formData.socialMedia}h</span></p>
                      <p>• Commute: <span className="font-bold">{formData.commuteProductivity === 'productive' ? '0h (productive!)' : `${(parseFloat(formData.commute) * 2 / 60).toFixed(1)}h`}</span></p>
                      <p>• Morning Routine: <span className="font-bold">{(parseFloat(formData.morningRoutine) / 60).toFixed(1)}h</span></p>
                      <p>• Evening Routine: <span className="font-bold">{(parseFloat(formData.eveningRoutine) / 60).toFixed(1)}h</span></p>
                      <p>• Lost to Distractions: <span className="font-bold">
                        {formData.productivity === 'distracted' ? '4h' : formData.productivity === 'average' ? '2h' : '0.5h'}
                      </span></p>
                    </div>
                    <div className="border-t border-yellow-600 pt-3">
                      <p className="text-base text-white">
                        <span className="font-bold">Total Daily Waste:</span> <span className="font-black text-yellow-400 text-2xl">
                          {(parseFloat(formData.screenTime) + 
                            parseFloat(formData.socialMedia) + 
                            (formData.commuteProductivity === 'productive' ? 0 : parseFloat(formData.commute) * 2 / 60) + 
                            parseFloat(formData.morningRoutine) / 60 +
                            parseFloat(formData.eveningRoutine) / 60 +
                            (formData.productivity === 'distracted' ? 4 : formData.productivity === 'average' ? 2 : 0.5)).toFixed(1)} hours/day
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg rounded-lg transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg transition-all"
                    >
                      Review
                    </button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-5">
                  <h2 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-3">
                    <BarChart3 className="w-7 h-7 text-yellow-500" />
                    Review Profile
                  </h2>

                  <div className="bg-black/50 rounded-lg p-4 space-y-2">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div><span className="text-gray-400">Birth:</span> <span className="font-bold ml-2">{formData.birthDate}</span></div>
                      <div><span className="text-gray-400">Gender:</span> <span className="font-bold ml-2">{formData.gender}</span></div>
                      <div className="col-span-2"><span className="text-gray-400">Country:</span> <span className="font-bold ml-2">{formData.country}</span></div>
                      <div><span className="text-gray-400">Smoking:</span> <span className="font-bold ml-2">{formData.smoker === 'no' ? 'No' : formData.smoker}</span></div>
                      <div><span className="text-gray-400">Alcohol:</span> <span className="font-bold ml-2">{formData.alcohol}</span></div>
                      <div><span className="text-gray-400">Exercise:</span> <span className="font-bold ml-2">{formData.exercise}</span></div>
                      <div><span className="text-gray-400">BMI:</span> <span className="font-bold ml-2">{formData.bmi}</span></div>
                      <div><span className="text-gray-400">Disease:</span> <span className="font-bold ml-2">{formData.chronicDisease}</span></div>
                      <div><span className="text-gray-400">Stress:</span> <span className="font-bold ml-2">{formData.stress}</span></div>
                      <div><span className="text-gray-400">Sleep:</span> <span className="font-bold ml-2">{formData.sleep}</span></div>
                      <div><span className="text-gray-400">Sleep Hours:</span> <span className="font-bold ml-2">{formData.sleepHours}h/night</span></div>
                      <div><span className="text-gray-400">Screen Time:</span> <span className="font-bold ml-2">{formData.screenTime}h/day</span></div>
                      <div><span className="text-gray-400">Social Media:</span> <span className="font-bold ml-2">{formData.socialMedia}h/day</span></div>
                      <div><span className="text-gray-400">Commute:</span> <span className="font-bold ml-2">{formData.commute}min {formData.commuteProductivity === 'productive' ? '(productive)' : '(wasted)'}</span></div>
                      <div><span className="text-gray-400">Morning Routine:</span> <span className="font-bold ml-2">{formData.morningRoutine}min</span></div>
                      <div><span className="text-gray-400">Evening Routine:</span> <span className="font-bold ml-2">{formData.eveningRoutine}min</span></div>
                      <div><span className="text-gray-400">Productivity:</span> <span className="font-bold ml-2">{formData.productivity}</span></div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 border-2 border-blue-600 rounded-lg p-4">
                    <p className="text-blue-300 font-bold mb-2 text-sm">💡 LONGEVITY BONUS</p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Calculations include +3 years for medical advances (CRISPR, AI diagnostics, preventive medicine) expected by 2045.
                    </p>
                  </div>

                  <div className="bg-yellow-900/30 border-2 border-yellow-600 rounded-lg p-4">
                    <p className="text-yellow-300 font-bold mb-2 text-sm">⚠️ DISCLAIMER</p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Based on WHO data and research. Actual lifespan depends on genetics, healthcare, accidents, and unpredictable factors.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleBack}
                      className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg rounded-lg transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCalculate}
                      className="flex-1 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xl rounded-lg transition-all transform hover:scale-105"
                    >
                      CALCULATE
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {showResults && stats && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-red-950 to-orange-950 rounded-2xl p-5 border-2 border-red-500 shadow-2xl">
                <div className="text-center">
                  <p className="text-xs text-gray-300 mb-1 font-semibold uppercase tracking-wide">RIGHT NOW AS YOU READ THIS</p>
                  <div className="text-5xl md:text-6xl font-mono font-black text-red-400 mb-1">
                    {currentTime.toLocaleTimeString()}
                  </div>
                  <p className="text-sm text-yellow-400 font-bold">Time you'll never get back</p>
                  <div className="mt-3 pt-3 border-t border-red-800">
                    <p className="text-xs text-gray-400 mb-1">Seconds wasted reading:</p>
                    <div className="text-3xl font-mono font-black text-orange-400">
                      {secondsWasted}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl p-6 border-2 border-blue-500 shadow-xl">
                <h3 className="text-2xl font-black mb-4 text-blue-300 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Years Expected Lifespan
                </h3>
                <div className="text-center mb-4">
                  <div className="text-6xl font-black text-blue-400 mb-1">{stats.lifeExpectancy}</div>
                  <div className="text-base text-gray-300">years</div>
                  <div className="mt-4 pt-4 border-t border-blue-800">
                    <p className="text-sm text-gray-300 mb-1">How we calculated this:</p>
                    <div className="text-xs text-gray-400 space-y-1">
                      <p>• Average life expectancy for {formData.gender}s in {formData.country}: <span className="text-white font-bold">{lifeExpectancyData[formData.country]?.[formData.gender]} years</span></p>
                      <p>• Medical advances bonus (CRISPR, AI diagnostics): <span className="text-green-400 font-bold">+3 years</span></p>
                      <p>• Your lifestyle adjustments: <span className={`font-bold ${(stats.lifeExpectancy - lifeExpectancyData[formData.country]?.[formData.gender] - 3) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {(stats.lifeExpectancy - lifeExpectancyData[formData.country]?.[formData.gender] - 3) >= 0 ? '+' : ''}{stats.lifeExpectancy - lifeExpectancyData[formData.country]?.[formData.gender] - 3} years
                      </span></p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/30 rounded-lg p-4">
                  <h4 className="font-bold text-base mb-3 text-blue-300 flex items-center justify-between">
                    <span>Your Health Score</span>
                    <span className={`text-2xl ${
                      stats.healthScore >= 85 ? 'text-green-400' :
                      stats.healthScore >= 70 ? 'text-yellow-400' :
                      stats.healthScore >= 50 ? 'text-orange-400' : 'text-red-400'
                    }`}>{stats.healthScore}/100</span>
                  </h4>
                  <div className="w-full h-5 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700 mb-3">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        stats.healthScore >= 85 ? 'bg-green-500' :
                        stats.healthScore >= 70 ? 'bg-yellow-500' :
                        stats.healthScore >= 50 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${stats.healthScore}%` }}
                    ></div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <p className="text-gray-300">
                      <span className="font-bold">What this means:</span> Based on your smoking, exercise, diet, sleep, and stress levels, your body is functioning at {stats.healthScore}% of optimal capacity.
                    </p>
                    {stats.healthScore === 100 ? (
                      <p className="text-green-400 font-semibold">🏆 Perfect! You scored 100/100 - optimal health in every category!</p>
                    ) : stats.healthScore >= 85 ? (
                      <p className="text-green-400 font-semibold">✓ Excellent! You're in the top tier for health optimization.</p>
                    ) : stats.healthScore >= 70 ? (
                      <p className="text-yellow-400 font-semibold">⚠ Good, but room for improvement. Small changes can add years.</p>
                    ) : stats.healthScore >= 50 ? (
                      <p className="text-orange-400 font-semibold">⚠ Warning: Multiple risk factors detected. Urgent changes needed.</p>
                    ) : (
                      <p className="text-red-400 font-semibold">🚨 Critical: High-risk lifestyle. Immediate action required.</p>
                    )}
                    <p className="text-gray-400 pt-2 border-t border-gray-700">
                      Years left: <span className="text-white font-bold">{Math.floor(stats.daysLeft / 365)} years</span>
                      {stats.healthScore < 100 && (
                        <span className="text-yellow-400"> • Room for improvement to reach 100/100</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {stats.potentialGains && stats.potentialGains.length > 0 && (
                <div className="bg-gradient-to-br from-green-900 to-emerald-950 rounded-2xl p-6 border-2 border-green-500 shadow-xl">
                  <h3 className="text-2xl font-black mb-4 text-green-400 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    Add {stats.totalPotentialYears} Years To Your Life
                  </h3>
                  <div className="space-y-3">
                    {stats.potentialGains.map((gain, index) => (
                      <div key={index} className="bg-black/30 p-3 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex-1">
                            <div className="font-bold text-base text-white">{gain.action}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              Difficulty: {gain.difficulty} | Start: {gain.timeframe}
                            </div>
                          </div>
                          <div className="text-right ml-3">
                            <div className="text-2xl font-black text-green-400">+{gain.years}y</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-yellow-400 mt-4 font-bold">
                    💡 These changes can add up to {stats.totalPotentialYears} years to your life. Start TODAY.
                  </p>
                </div>
              )}

              {risks.length > 0 && (
                <div className="bg-gradient-to-br from-red-900 to-red-950 rounded-2xl p-6 border-2 border-red-600 shadow-xl">
                  <h3 className="text-2xl font-black mb-4 text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6" />
                    Current Risk Factors
                  </h3>
                  <div className="space-y-3">
                    {risks.map((risk, index) => (
                      <div key={index} className="flex items-center justify-between bg-black/30 p-3 rounded-lg">
                        <div className="flex-1">
                          <div className="font-bold text-base">{risk.factor}</div>
                          <div className="text-xs text-gray-400">Impact: {risk.impact}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black text-red-400">{risk.years}y</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-gray-700">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-bold text-gray-400">LIFE PROGRESS</span>
                  <span className="font-bold text-gray-400">{stats.percentLived}% GONE</span>
                </div>
                <div className="w-full h-6 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 transition-all duration-1000"
                    style={{ width: `${stats.percentLived}%` }}
                  ></div>
                </div>
                <p className="text-center mt-3 text-sm text-gray-400">
                  Lived: <span className="text-white font-bold">{stats.yearsLived}y</span> | 
                  Left: <span className="text-red-400 font-bold"> {stats.daysLeft.toLocaleString()} days</span>
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-red-900 to-red-950 rounded-xl p-5 border-2 border-red-600 shadow-xl transform hover:scale-105 transition-transform">
                  <AlertCircle className="w-10 h-10 mb-3 text-red-400" />
                  <div className="text-4xl font-black mb-1">{stats.daysLeft.toLocaleString()}</div>
                  <div className="text-base font-bold text-gray-300 mb-2">Days Left</div>
                  <div className="text-xs text-gray-400">
                    That's only {stats.weeksLeft.toLocaleString()} weeks
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-900 to-orange-950 rounded-xl p-5 border-2 border-orange-600 shadow-xl transform hover:scale-105 transition-transform">
                  <TrendingDown className="w-10 h-10 mb-3 text-orange-400" />
                  <div className="text-4xl font-black mb-1">{stats.percentLived}%</div>
                  <div className="text-base font-bold text-gray-300 mb-2">Already Gone</div>
                  <div className="text-xs text-gray-400">
                    You've lived {stats.yearsLived} years
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-900 to-yellow-950 rounded-xl p-5 border-2 border-yellow-600 shadow-xl transform hover:scale-105 transition-transform">
                  <Clock className="w-10 h-10 mb-3 text-yellow-400" />
                  <div className="text-4xl font-black mb-1">{stats.usableHours.toLocaleString()}</div>
                  <div className="text-base font-bold text-gray-300 mb-2">Usable Hours Left</div>
                  <div className="text-xs text-gray-400">
                    After sleep and basic maintenance
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-gray-600 shadow-xl">
                <div className="flex items-start gap-4">
                  <TrendingDown className="w-12 h-12 text-gray-400 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-3 text-gray-300">Hours You'll Waste</h3>
                    <div className="text-5xl font-black text-gray-400 mb-3">{stats.wasteHours.toLocaleString()}</div>
                    <p className="text-base text-gray-400 leading-relaxed mb-4">
                      If you keep living like yesterday, you'll throw away <span className="text-white font-bold">{Math.floor(stats.wasteHours / 24).toLocaleString()} days</span> on nothing. Scrolling, procrastinating, waiting for someday.
                    </p>
                    
                    <div className="bg-black/30 rounded-lg p-4 mt-4">
                      <h4 className="text-sm font-bold text-yellow-400 mb-3">📊 BREAKDOWN OF YOUR WASTE:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">📺 Screen Time ({formData.screenTime}h/day)</span>
                          <span className="text-white font-bold">{stats.wasteBreakdown.screenTime.toLocaleString()}h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">📱 Social Media ({formData.socialMedia}h/day)</span>
                          <span className="text-white font-bold">{stats.wasteBreakdown.socialMedia.toLocaleString()}h</span>
                        </div>
                        {!stats.wasteBreakdown.commuteOverlap && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">🚗 Commute ({formData.commute}min × 2)</span>
                            <span className="text-white font-bold">{stats.wasteBreakdown.commute.toLocaleString()}h</span>
                          </div>
                        )}
                        {stats.wasteBreakdown.commuteOverlap && (
                          <div className="flex justify-between items-center">
                            <span className="text-green-400">✓ Commute (productive!)</span>
                            <span className="text-green-400 font-bold">0h saved!</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">🧼 Morning Routine ({formData.morningRoutine}min)</span>
                          <span className="text-white font-bold">{stats.wasteBreakdown.morningRoutine.toLocaleString()}h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">🌙 Evening Routine ({formData.eveningRoutine}min)</span>
                          <span className="text-white font-bold">{stats.wasteBreakdown.eveningRoutine.toLocaleString()}h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">😴 Distractions & Procrastination</span>
                          <span className="text-white font-bold">{stats.wasteBreakdown.productivity.toLocaleString()}h</span>
                        </div>
                        <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between items-center">
                          <span className="text-yellow-400 font-bold">⏰ Daily Waste:</span>
                          <span className="text-red-400 font-bold text-lg">{stats.dailyWasteHours}h/day</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-yellow-400 mt-4 font-semibold">
                      💡 Cut your screen time by just 2 hours/day to reclaim {Math.floor((stats.daysLeft * 2) / 24).toLocaleString()} days of your life!
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-900 to-purple-950 rounded-xl p-5 border-2 border-purple-600 shadow-xl">
                  <Calendar className="w-10 h-10 mb-3 text-purple-400" />
                  <div className="text-4xl font-black mb-1">{stats.saturdaysLeft.toLocaleString()}</div>
                  <div className="text-base font-bold text-gray-300 mb-2">Saturdays Left</div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>• {stats.sundaysLeft.toLocaleString()} Sundays</div>
                    <div>• {stats.christmasLeft} Christmases</div>
                    <div>• {stats.birthdaysLeft} Birthdays</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-xl p-5 border-2 border-indigo-600 shadow-xl">
                  <BarChart3 className="w-10 h-10 mb-3 text-indigo-400" />
                  <div className="text-4xl font-black mb-1">{stats.daysLeft.toLocaleString()}</div>
                  <div className="text-base font-bold text-gray-300 mb-2">Days Left</div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>• {stats.weeksLeft.toLocaleString()} weeks</div>
                    <div>• {stats.monthsLeft.toLocaleString()} months</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-950 via-red-900 to-orange-950 border-4 border-red-600 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-8 h-8 text-red-400" />
                  <h2 className="text-3xl font-black text-red-400">THE BRUTAL REALITY</h2>
                </div>
                <div className="space-y-3 text-base leading-relaxed">
                  <p>→ Statistically, your life ends on <span className="font-black text-red-400 text-xl">{stats.endDate}</span>. Based on your country, gender, and lifestyle choices.</p>
                  <p>→ You have <span className="font-black text-red-400">{stats.saturdaysLeft.toLocaleString()}</span> Saturdays left to do everything you've been putting off.</p>
                  <p>→ After sleep, you have <span className="font-black text-red-400">{Math.floor(stats.usableHours / 8).toLocaleString()}</span> work days left. That's your entire productive life.</p>
                  <p>→ You'll spend about <span className="font-black text-red-400">{Math.floor(stats.avgSleepHours / 24).toLocaleString()}</span> days sleeping ({formData.sleepHours}h/night).</p>
                  <p>→ If you waste time like you do now, you'll throw away <span className="font-black text-red-400">{Math.floor(stats.wasteHours / 24).toLocaleString()}</span> days on meaningless activities ({stats.dailyWasteHours}h/day).</p>
                  <p>→ That means you ACTUALLY have about <span className="font-black text-red-400">{Math.floor(stats.usableHours / 24).toLocaleString()}</span> productive days to build everything you want.</p>
                  {stats.totalPotentialYears > 0 && (
                    <p className="pt-3 border-t border-red-800">→ You could add <span className="font-black text-green-400">{stats.totalPotentialYears} YEARS</span> by changing TODAY</p>
                  )}
                  <p className="text-yellow-400 font-bold pt-3">→ But remember: accidents, illness, and unpredictable events could end it sooner. Every single person who ran out of time wished they started sooner. Will you be one of them?</p>
                </div>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-600">
                <h3 className="text-2xl font-black mb-5 text-blue-400 flex items-center gap-2">
                  <BarChart3 className="w-7 h-7" />
                  Put This In Perspective
                </h3>
                <div className="grid md:grid-cols-2 gap-5 text-base">
                  <div className="space-y-3">
                    <p>• Most bestselling books: <span className="text-blue-400 font-bold">2-3 years to write</span></p>
                    <p>• Master a skill: <span className="text-blue-400 font-bold">~5 years of focused practice</span></p>
                    <p>• Build a successful startup: <span className="text-blue-400 font-bold">7-10 years average</span></p>
                  </div>
                  <div className="space-y-3">
                    <p>• Get in best shape ever: <span className="text-blue-400 font-bold">1-2 years</span></p>
                    <p>• Learn a language fluently: <span className="text-blue-400 font-bold">2-3 years</span></p>
                    <p>• Complete a PhD: <span className="text-blue-400 font-bold">4-6 years</span></p>
                  </div>
                </div>
                <p className="mt-6 text-xl font-bold text-center text-blue-300">
                  You have {Math.floor(stats.daysLeft / 365)} years. How many of these could you accomplish?
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-900 via-emerald-900 to-green-950 rounded-2xl p-6 border-4 border-green-500">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-8 h-8 text-green-400" />
                  <h2 className="text-3xl font-black text-green-400">SO WHAT NOW?</h2>
                </div>
                <div className="space-y-4 text-base leading-relaxed mb-5">
                  <p className="font-semibold text-xl">This moment, right now, is the youngest you'll ever be again.</p>
                  <p>Every day you delay is a day you never get back. Every hour spent scrolling is an hour stolen from your dreams.</p>
                  <p className="font-semibold text-lg">You have two choices right now:</p>
                  <p><span className="text-red-400 font-bold">Choice 1:</span> Close this. Forget about it. Keep wasting days. Wake up in 5 years with {stats.daysLeft - 1825} days left, wondering where it went.</p>
                  <p><span className="text-green-400 font-bold">Choice 2:</span> Accept that time is finite. That every day matters. That starting TODAY is the only option you have.</p>
                  <p className="text-2xl font-black text-green-400 mt-6 pt-6 border-t-2 border-green-600">
                    TODAY is the day you decide: Will you spend your remaining {stats.daysLeft.toLocaleString()} days building something meaningful, or will you waste them wishing you had started?
                  </p>
                  <p className="text-xl font-bold text-center text-yellow-400 mt-4">
                    In {stats.daysLeft.toLocaleString()} days, you'll either be someone who built something meaningful, or someone who wished they had.
                  </p>
                </div>

                {!showCommitment ? (
                  <button
                    onClick={() => setShowCommitment(true)}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black text-lg rounded-lg transition-all"
                  >
                    I COMMIT TO CHANGE
                  </button>
                ) : (
                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-green-300 uppercase">
                      What will you start TODAY?
                    </label>
                    <textarea
                      value={commitment}
                      onChange={(e) => {
                        setCommitment(e.target.value);
                        setCommitmentSaved(false);
                      }}
                      placeholder="I will start..."
                      className="w-full px-4 py-3 bg-black/50 border-2 border-green-600 rounded-lg text-white text-base focus:border-green-400 focus:outline-none min-h-24"
                    />
                    <button
                      onClick={() => {
                        if (commitment.trim()) {
                          const commitmentText = `MY COMMITMENT - ${new Date().toLocaleDateString()}\n\n${commitment}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nYour Reality:\n• Days Left: ${stats.daysLeft.toLocaleString()}\n• Life Expectancy: ${stats.lifeExpectancy} years\n• Health Score: ${stats.healthScore}/100\n• Saturdays Remaining: ${stats.saturdaysLeft.toLocaleString()}\n\n"The trouble is, you think you have time." - Buddha\n\nStart TODAY. Time is running out.`;
                          
                          // Create rich HTML for better formatting
                          const htmlContent = `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
                              <h1 style="color: #dc2626; font-size: 24px; margin-bottom: 10px;">MY COMMITMENT</h1>
                              <p style="color: #666; font-size: 14px; margin-bottom: 20px;">${new Date().toLocaleDateString()}</p>
                              <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px; padding: 15px; background: #f0fdf4; border-left: 4px solid #22c55e;">${commitment}</p>
                              <hr style="border: 1px solid #ddd; margin: 30px 0;">
                              <h2 style="color: #dc2626; font-size: 18px; margin-bottom: 15px;">Your Reality:</h2>
                              <ul style="list-style: none; padding: 0; font-size: 14px; line-height: 2;">
                                <li>• <strong>Days Left:</strong> ${stats.daysLeft.toLocaleString()}</li>
                                <li>• <strong>Life Expectancy:</strong> ${stats.lifeExpectancy} years</li>
                                <li>• <strong>Health Score:</strong> ${stats.healthScore}/100</li>
                                <li>• <strong>Saturdays Remaining:</strong> ${stats.saturdaysLeft.toLocaleString()}</li>
                              </ul>
                              <p style="font-style: italic; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">"The trouble is, you think you have time." - Buddha</p>
                              <p style="font-weight: bold; color: #dc2626; margin-top: 20px;">Start TODAY. Time is running out.</p>
                            </div>
                          `;
                          
                          // Copy both plain text and HTML
                          const blob = new Blob([htmlContent], { type: 'text/html' });
                          const clipboardItem = new ClipboardItem({
                            'text/html': blob,
                            'text/plain': new Blob([commitmentText], { type: 'text/plain' })
                          });
                          
                          navigator.clipboard.write([clipboardItem]).then(() => {
                            setCommitmentSaved(true);
                            setTimeout(() => setCommitmentSaved(false), 4000);
                          }).catch(() => {
                            // Fallback to plain text if rich copy fails
                            navigator.clipboard.writeText(commitmentText).then(() => {
                              setCommitmentSaved(true);
                              setTimeout(() => setCommitmentSaved(false), 4000);
                            });
                          });
                        }
                      }}
                      disabled={!commitment.trim()}
                      className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold text-base rounded-lg transition-all"
                    >
                      {commitmentSaved ? '✅ COPIED - PASTE INTO WORD!' : '📄 COPY FOR WORD DOCUMENT'}
                    </button>
                    <p className="text-xs text-green-300 text-center">
                      {commitmentSaved ? (
                        <span className="font-bold text-green-400">✓ Now open Word/Google Docs and press Ctrl+V (or Cmd+V on Mac) to paste with formatting!</span>
                      ) : (
                        'Copies formatted text. Paste directly into Word, Google Docs, or Notes - formatting included!'
                      )}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setShowResults(false);
                  setStep(1);
                  setFormData({
                    birthDate: '',
                    gender: '',
                    country: '',
                    smoker: 'no',
                    alcohol: 'moderate',
                    exercise: 'moderate',
                    bmi: 'normal',
                    chronicDisease: 'none',
                    stress: 'moderate',
                    sleep: 'good'
                  });
                  setSecondsWasted(0);
                  setCommitment('');
                  setShowCommitment(false);
                  setSearchTerm('');
                }}
                className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
              >
                Calculate For Someone Else
              </button>
            </div>
          )}

          <div className="mt-12 text-center text-gray-500 text-xs pb-8 space-y-1">
            <p className="text-base font-bold text-gray-400">"The trouble is, you think you have time."</p>
            <p className="text-xs">- Buddha</p>
            <p className="text-xs mt-3">Based on WHO data + longevity research. Not medical advice.</p>
          </div>
        </div>
      </div>
    </div>
  );
}