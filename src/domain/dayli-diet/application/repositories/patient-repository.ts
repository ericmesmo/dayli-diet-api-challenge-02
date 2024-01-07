import { Patient } from '../../enterprise/entities/patient'

export abstract class PatientRepository {
  abstract create(patient: Patient): Promise<void>
  abstract findByEmail(email: string): Promise<Patient | null>
  abstract findById(id: string): Promise<Patient>
}
