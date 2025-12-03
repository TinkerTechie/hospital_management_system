# Issues to Fix

## 1. Patient Deletion Not Working
**Issue**: Cannot delete patients from admin dashboard
**Likely Cause**: Foreign key constraints - patients have related records (appointments, medical records, invoices, etc.)
**Solution**: Update DELETE API to handle cascading deletes or set foreign keys to NULL

## 2. Pagination Not Working  
**Issue**: Pagination broken on pages with server-side search
**Likely Cause**: When search changes, pagination state isn't reset, or API isn't using correct pagination params
**Affected Pages**:
- `/dashboard/doctor/patients` 
- `/dashboard/nurse/patients`

## 3. Appointment Rescheduling Not Working
**Issue**: Cannot reschedule appointments from patient dashboard
**Location**: Patient dashboard appointments table
**Need to investigate**: The rescheduling UI/API implementation
