# Advanced Image Upload Component

A professional, reusable image upload component for the admin panel with drag-and-drop support, file validation, preview functionality, and comprehensive error handling.

## Features

- ✅ **Drag & Drop Support** - Users can drag images directly onto the upload area
- ✅ **Multiple Format Support** - PNG, JPG, JPEG, WebP, GIF
- ✅ **File Validation** - Size and type validation with custom error messages
- ✅ **Real-time Preview** - Instant preview of uploaded images
- ✅ **Progress Indicators** - Loading states and success/error feedback
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Accessibility** - Full keyboard navigation and screen reader support
- ✅ **Customizable** - Extensive props for different use cases
- ✅ **Production Ready** - Comprehensive error handling and validation

## Component Props

```typescript
interface ImageUploadProps {
  label: string;                    // Label for the upload field
  value?: string;                   // Current image URL
  onChange: (url: string) => void;  // Callback when image changes
  required?: boolean;               // Whether the field is required
  className?: string;               // Additional CSS classes
  accept?: string;                  // Accepted file types (default: PNG, JPG, JPEG, WebP)
  maxSize?: number;                 // Maximum file size in MB (default: 5MB)
  aspectRatio?: number;             // Preview aspect ratio (width/height)
  showPreview?: boolean;            // Whether to show image preview (default: true)
  multiple?: boolean;               // Allow multiple file selection (default: false)
  onError?: (error: string) => void; // Error callback
  onSuccess?: (url: string) => void; // Success callback
  disabled?: boolean;               // Disable the upload component
  placeholder?: string;             // Custom placeholder text
  helperText?: string;              // Helper text below the label
}
```

## Usage Examples

### Basic Usage

```tsx
import { ImageUpload } from '@/components/ui/ImageUpload';

function MyForm() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageUpload
      label="Profile Picture"
      value={imageUrl}
      onChange={setImageUrl}
      required
    />
  );
}
```

### Advanced Usage with Custom Settings

```tsx
import { ImageUpload } from '@/components/ui/ImageUpload';

function HeroImageUpload() {
  const [heroImage, setHeroImage] = useState('');

  const handleUploadSuccess = (url: string) => {
    console.log('Image uploaded successfully:', url);
    // Additional logic after successful upload
  };

  const handleUploadError = (error: string) => {
    console.error('Upload failed:', error);
    // Handle upload errors
  };

  return (
    <ImageUpload
      label="Hero Image"
      value={heroImage}
      onChange={setHeroImage}
      accept="image/png,image/jpeg,image/webp"
      maxSize={10} // 10MB limit
      aspectRatio={16/9} // 16:9 aspect ratio
      showPreview={true}
      required
      onSuccess={handleUploadSuccess}
      onError={handleUploadError}
      placeholder="Upload your hero image"
      helperText="Recommended size: 1920x1080px"
    />
  );
}
```

### Multiple Image Formats

```tsx
// PNG only
<ImageUpload
  label="Logo"
  accept="image/png"
  maxSize={2}
  helperText="PNG format only, max 2MB"
/>

// All image formats
<ImageUpload
  label="Gallery Image"
  accept="image/*"
  maxSize={5}
  helperText="Any image format accepted"
/>
```

### Disabled State

```tsx
<ImageUpload
  label="Profile Image"
  value={imageUrl}
  onChange={setImageUrl}
  disabled={isLoading}
  helperText="Upload disabled while processing"
/>
```

## API Endpoint

The component uses `/api/upload` endpoint for file uploads.

### API Features

- **File Validation**: Checks file size and type
- **Secure Storage**: Files stored in Cloudinary cloud storage
- **Unique Naming**: Prevents filename conflicts with Cloudinary public IDs
- **Error Handling**: Comprehensive error responses
- **Supported Formats**: PNG, JPG, JPEG, WebP, GIF
- **Size Limit**: 5MB default (configurable)
- **CDN**: Automatic global CDN distribution

### API Response

```json
{
  "success": true,
  "url": "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/renderwise-uploads/image.jpg",
  "fileName": "image.jpg",
  "publicId": "renderwise-uploads/image",
  "size": 1024000,
  "type": "image/jpeg",
  "cloudinaryId": "renderwise-uploads/image"
}
```

### Error Response

```json
{
  "error": "File size must be less than 5MB"
}
```

## File Storage

Uploaded files are stored in Cloudinary cloud storage:
- **Cloud Service**: Cloudinary
- **Folder**: `renderwise-uploads`
- **URL Pattern**: `https://res.cloudinary.com/{cloud-name}/image/upload/v{version}/{folder}/{filename}`
- **Example**: `https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/renderwise-uploads/image.jpg`

## Validation Rules

### File Size
- **Default**: 5MB maximum
- **Configurable**: Via `maxSize` prop
- **Client-side**: Immediate feedback
- **Server-side**: Additional validation

### File Types
- **PNG**: `image/png`
- **JPEG**: `image/jpeg`, `image/jpg`
- **WebP**: `image/webp`
- **GIF**: `image/gif`
- **Custom**: Via `accept` prop

## Styling

The component uses Tailwind CSS classes and follows the design system:

- **Border**: Dashed border with hover effects
- **Colors**: Uses theme colors (primary, destructive, muted)
- **States**: Loading, error, success, disabled states
- **Responsive**: Adapts to different screen sizes

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **Error Announcements**: Screen reader friendly error messages

## Error Handling

### Client-side Validation
- File size validation
- File type validation
- Network error handling
- Upload progress feedback

### Server-side Validation
- File existence check
- Size limit enforcement
- Type validation
- Cloudinary upload error handling
- Network connectivity validation

## Performance Features

- **Lazy Loading**: Images load only when needed
- **Optimized Previews**: Efficient file reading
- **Memory Management**: Proper cleanup of file readers
- **Network Optimization**: Efficient upload handling

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **File API**: Full support for drag & drop
- **FormData**: Compatible with all modern browsers
- **FileReader**: Used for preview generation

## Security Considerations

- **Cloud Storage**: Files stored securely in Cloudinary
- **No Local Storage**: Eliminates server filesystem security risks
- **CDN Protection**: Cloudinary provides DDoS protection
- **Access Control**: Images are publicly accessible but with unique URLs

- **File Type Validation**: Both client and server-side
- **Size Limits**: Prevents large file uploads
- **Unique Filenames**: Prevents path traversal
- **Error Sanitization**: Safe error messages

## Customization

### Custom Styling

```tsx
<ImageUpload
  label="Custom Styled Upload"
  className="border-2 border-blue-500 rounded-xl"
  // ... other props
/>
```

### Custom Validation

```tsx
const handleUploadError = (error: string) => {
  // Custom error handling
  toast.error(error);
};

<ImageUpload
  onError={handleUploadError}
  // ... other props
/>
```

## Integration Examples

### With Form Libraries

```tsx
// React Hook Form
import { useForm, Controller } from 'react-hook-form';

function MyForm() {
  const { control } = useForm();

  return (
    <Controller
      name="image"
      control={control}
      render={({ field }) => (
        <ImageUpload
          label="Image"
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
}
```

### With State Management

```tsx
// Zustand
import { useStore } from '@/store';

function ImageUploadWithStore() {
  const { imageUrl, setImageUrl } = useStore();

  return (
    <ImageUpload
      label="Store Image"
      value={imageUrl}
      onChange={setImageUrl}
    />
  );
}
```

## Troubleshooting

### Common Issues

1. **Upload Fails**: Check file size and type
2. **Preview Not Showing**: Ensure file is valid image
3. **Network Errors**: Check API endpoint availability
4. **Storage Issues**: Verify uploads directory permissions

### Debug Mode

```tsx
<ImageUpload
  label="Debug Upload"
  onError={(error) => console.log('Upload error:', error)}
  onSuccess={(url) => console.log('Upload success:', url)}
/>
```

## Best Practices

1. **Always validate** file types and sizes
2. **Provide clear feedback** for upload states
3. **Handle errors gracefully** with user-friendly messages
4. **Use appropriate file size limits** for your use case
5. **Test across different browsers** and devices
6. **Implement proper cleanup** for file readers
7. **Consider image optimization** for production use

## Future Enhancements

- [ ] Image compression before upload
- [ ] Multiple file upload support
- [ ] Image cropping functionality
- [ ] Cloud storage integration (AWS S3, Cloudinary)
- [ ] Image optimization and resizing
- [ ] Advanced preview with zoom
- [ ] Upload progress percentage
- [ ] Retry failed uploads 